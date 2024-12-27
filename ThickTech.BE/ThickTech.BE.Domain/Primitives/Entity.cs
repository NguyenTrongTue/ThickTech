namespace ThickTech.BE.Domain.Primitives;

public abstract class Entity : IEquatable<Entity>
{
    protected Entity(Guid _id) => id = _id;

    protected Entity()
    {
    }

    public Guid id { get; private init; }

    public static bool operator ==(Entity? first, Entity? second) =>
        first is not null && second is not null && first.Equals(second);

    public static bool operator !=(Entity? first, Entity? second) =>
        !(first == second);

    public bool Equals(Entity? other)
    {
        if (other is null)
        {
            return false;
        }

        if (other.GetType() != GetType())
        {
            return false;
        }

        return other.id == id;
    }

    public override bool Equals(object? obj)
    {
        if (obj is null)
        {
            return false;
        }

        if (obj.GetType() != GetType())
        {
            return false;
        }

        if (obj is not Entity entity)
        {
            return false;
        }

        return entity.id == id;
    }

    public override int GetHashCode() => id.GetHashCode() * 41;
}