using MediatR;
namespace ThickTech.BE.Domain.Primitives;
public interface IDomainEvent : INotification
{
    public Guid id { get; init; }
}
