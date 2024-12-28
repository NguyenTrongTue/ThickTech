using ThickTech.BE.Domain.Primitives;
using MediatR;

namespace ThickTech.BE.Application.Abstractions;

public interface IDomainEventHandler<TEvent> : INotificationHandler<TEvent>
    where TEvent : IDomainEvent
{
}
