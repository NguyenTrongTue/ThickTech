using System.Text.RegularExpressions;
using ThickTech.BE.Domain.Errors;
using ThickTech.BE.Domain.Primitives;
using ThickTech.BE.Domain.Shared;

namespace ThickTech.BE.Domain.ValueObjects;

public sealed class Password : ValueObject
{
    public const int MaxLength = 20;
    public const int MinLength = 8;

    private Password(string value)
    {
        Value = value;
    }

    private Password()
    {
    }

    public string Value { get; private set; }

    public static Result<Password> Create(string password) =>
      Result.Create(password)
          .Ensure(
              e => !string.IsNullOrWhiteSpace(e),
              DomainErrors.Password.Empty)
          .Ensure(
              e => e.Length <= MaxLength,
              DomainErrors.Password.TooLong)
           .Ensure(
              e => e.Length >= MinLength,
              DomainErrors.Password.TooShort)
          .Ensure(
                e => Regex.IsMatch(e, @"^(?=.*[a-z])(?=.*\d).+$"),
              DomainErrors.Password.InvalidFormat)
          .Map(e => new Password(e));

    public override IEnumerable<object> GetAtomicValues()
    {
        yield return Value;
    }
}
