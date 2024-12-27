using ThickTech.BE.Domain.Primitives;

namespace ThickTech.BE.Domain.DomainEvents;

public abstract record DomainEvent(Guid id) : IDomainEvent;
