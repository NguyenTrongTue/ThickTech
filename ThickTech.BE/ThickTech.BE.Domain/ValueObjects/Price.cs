using ThickTech.BE.Domain.Errors;
using ThickTech.BE.Domain.Primitives;
using ThickTech.BE.Domain.Shared;

namespace ThickTech.BE.Domain.ValueObjects;

public sealed class Price : ValueObject
{
    public const int MinValue = 0;

    private Price(decimal value)
    {
        Value = value;
    }
    private Price()
    {
    }
    public decimal Value { get; private set; }

    public static Result<Price> Create(decimal price)
    {
        if (price <= MinValue)
        {
            return Result.Failure<Price>(DomainErrors.Price.LessThanZero);
        }
        return new Price(price);
    }

    public override IEnumerable<object> GetAtomicValues()
    {
        yield return Value;
    }
}
