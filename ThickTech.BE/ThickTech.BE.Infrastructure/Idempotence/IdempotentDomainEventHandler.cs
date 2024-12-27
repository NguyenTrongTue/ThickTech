using ThickTech.BE.Domain.Primitives;
using ThickTech.BE.Persistence;
using ThickTech.BE.Persistence.Outbox;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ThickTech.BE.Application.Abstractions;

namespace ThickTech.BE.Infrastructure.Idempotence;

public sealed class IdempotentDomainEventHandler<TDomainEvent> : IDomainEventHandler<TDomainEvent>
    where TDomainEvent : IDomainEvent
{
    private readonly INotificationHandler<TDomainEvent> _decorated;
    private readonly ApplicationDbContext _dbContext;

    public IdempotentDomainEventHandler(
        INotificationHandler<TDomainEvent> decorated,
        ApplicationDbContext dbContext)
    {
        _decorated = decorated;
        _dbContext = dbContext;
    }

    public async Task Handle(TDomainEvent notification, CancellationToken cancellationToken)
    {
        string consumer = _decorated.GetType().Name;

        if (await _dbContext.Set<OutboxMessageConsumer>()
                .AnyAsync(
                    outboxMessageConsumer =>
                        outboxMessageConsumer.id == notification.id &&
                        outboxMessageConsumer.name == consumer,
                    cancellationToken))
        {
            return;
        }

        await _decorated.Handle(notification, cancellationToken);

        _dbContext.Set<OutboxMessageConsumer>()
            .Add(new OutboxMessageConsumer
            {
                id = notification.id,
                name = consumer
            });

        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
