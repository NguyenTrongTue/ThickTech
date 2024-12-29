using ThickTech.BE.Domain.Errors;
using ThickTech.BE.Domain.Primitives;
using ThickTech.BE.Domain.Shared;

namespace ThickTech.BE.Domain.ValueObjects;

public sealed class Quantity : ValueObject
{
    public const int MinValue = 0;

    private Quantity(int value)
    {
        Value = value;
    }
    private Quantity()
    {
    }
    public int Value { get; private set; }

    public static Result<Quantity> Create(int quantity)
    {
        if (quantity <= MinValue)
        {
            return Result.Failure<Quantity>(DomainErrors.Quantity.LessThanZero);
        }
        return new Quantity(quantity);
    }

    public override IEnumerable<object> GetAtomicValues()
    {
        yield return Value;
    }
}
