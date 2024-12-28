using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.DomainEvents;

namespace ThickTech.BE.Application.Members;

internal sealed class PerformBackgroundCheckWhenMemberRegisteredDomainEventHandler
    : IDomainEventHandler<UserRegisteredDomainEvent>
{
    public Task Handle(
        UserRegisteredDomainEvent notification,
        CancellationToken cancellationToken) =>
        Task.CompletedTask;
}
