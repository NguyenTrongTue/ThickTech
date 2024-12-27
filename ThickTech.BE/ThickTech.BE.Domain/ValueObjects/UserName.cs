using ThickTech.BE.Domain.Errors;
using ThickTech.BE.Domain.Primitives;
using ThickTech.BE.Domain.Shared;

namespace ThickTech.BE.Domain.ValueObjects;

public sealed class UserName : ValueObject
{
    public const int MaxLength = 50;

    private UserName(string value)
    {
        Value = value;
    }

    private UserName()
    {
    }

    public string Value { get; private set; }

    public static Result<UserName> Create(string firstName)
    {
        if (string.IsNullOrWhiteSpace(firstName))
        {
            return Result.Failure<UserName>(DomainErrors.FirstName.Empty);
        }

        if (firstName.Length > MaxLength)
        {
            return Result.Failure<UserName>(DomainErrors.FirstName.TooLong);
        }

        return new UserName(firstName);
    }

    public override IEnumerable<object> GetAtomicValues()
    {
        yield return Value;
    }
}
