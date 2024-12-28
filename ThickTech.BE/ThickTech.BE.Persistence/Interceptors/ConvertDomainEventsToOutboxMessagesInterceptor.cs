using ThickTech.BE.Domain.Primitives;
using ThickTech.BE.Persistence.Outbox;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Newtonsoft.Json;

namespace ThickTech.BE.Persistence.Interceptors;

public sealed class ConvertDomainEventsToOutboxMessagesInterceptor
     : SaveChangesInterceptor
{
    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(
        DbContextEventData eventData,
        InterceptionResult<int> result,
        CancellationToken cancellationToken = default)
    {
        DbContext? dbContext = eventData.Context;

        if (dbContext is null)
        {
            return base.SavingChangesAsync(eventData, result, cancellationToken);
        }

        var outboxMessages = dbContext.ChangeTracker
            .Entries<AggregateRoot>()
            .Select(x => x.Entity)
            .SelectMany(aggregateRoot =>
            {
                var domainEvents = aggregateRoot.GetDomainEvents();

                aggregateRoot.ClearDomainEvents();

                return domainEvents;
            })
            .Select(domainEvent => new OutboxMessage
            {
                id = Guid.NewGuid(),
                occurred_on_utc= DateTime.UtcNow,
                type = domainEvent.GetType().Name,
                content = JsonConvert.SerializeObject(
                    domainEvent,
                    new JsonSerializerSettings
                    {
                        TypeNameHandling = TypeNameHandling.All
                    })
            })
            .ToList();

        dbContext.Set<OutboxMessage>().AddRange(outboxMessages);

        return base.SavingChangesAsync(eventData, result, cancellationToken);
    }
}
