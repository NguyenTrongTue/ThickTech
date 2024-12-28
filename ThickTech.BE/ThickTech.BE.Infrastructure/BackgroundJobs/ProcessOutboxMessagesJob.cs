using ThickTech.BE.Domain.Primitives;
using ThickTech.BE.Persistence;
using ThickTech.BE.Persistence.Outbox;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Quartz;

namespace ThickTech.BE.Infrastructure.BackgroundJobs;

[DisallowConcurrentExecution]
public class ProcessOutboxMessagesJob : IJob
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IPublisher _publisher;

    public ProcessOutboxMessagesJob(ApplicationDbContext dbContext, IPublisher publisher)
    {
        _dbContext = dbContext;
        _publisher = publisher;
    }

    public async Task Execute(IJobExecutionContext context)
    {
        List<OutboxMessage> messages = await _dbContext
            .Set<OutboxMessage>()
            .Where(m => m.processed_on_utc == null)
            .Take(20)
            .ToListAsync(context.CancellationToken);

        foreach (OutboxMessage outboxMessage in messages)
        {
            IDomainEvent? domainEvent = JsonConvert
                .DeserializeObject<IDomainEvent>(
                    outboxMessage.content,
                    new JsonSerializerSettings
                    {
                        TypeNameHandling = TypeNameHandling.All
                    });

            if (domainEvent is null)
            {
                continue;
            }

            await _publisher.Publish(domainEvent, context.CancellationToken);

            outboxMessage.processed_on_utc = DateTime.UtcNow;
        }

        await _dbContext.SaveChangesAsync();
    }
}
