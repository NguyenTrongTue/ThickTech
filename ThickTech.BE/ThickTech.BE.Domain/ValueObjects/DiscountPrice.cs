using ThickTech.BE.Domain.Errors;
using ThickTech.BE.Domain.Primitives;
using ThickTech.BE.Domain.Shared;
namespace ThickTech.BE.Domain.ValueObjects;
public sealed class DiscountPrice : ValueObject
{
    public const int MinValue = 0;

    private DiscountPrice(decimal value)
    {
        Value = value;
    }
    private DiscountPrice()
    {
    }
    public decimal Value { get; private set; }

    public static Result<DiscountPrice> Create(decimal discountPrice, decimal price)
    {
        if (discountPrice <= MinValue)
        {
            return Result.Failure<DiscountPrice>(DomainErrors.DiscountPrice.LessThanZero);
        }
        if (discountPrice > price)
        {
            return Result.Failure<DiscountPrice>(DomainErrors.DiscountPrice.InvalidDiscountPrice);
        }
        return new DiscountPrice(discountPrice);
    }

    public override IEnumerable<object> GetAtomicValues()
    {
        yield return Value;
    }
}
