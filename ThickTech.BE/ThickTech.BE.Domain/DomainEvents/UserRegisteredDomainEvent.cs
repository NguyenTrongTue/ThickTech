namespace ThickTech.BE.Domain.DomainEvents;

public sealed record UserRegisteredDomainEvent(Guid id, Guid user_id) : DomainEvent(id);
