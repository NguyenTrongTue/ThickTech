using FluentValidation;
using ThickTech.BE.Domain.ValueObjects;

namespace ThickTech.BE.Application.Members;
internal class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
{
    public CreateUserCommandValidator()
    {
        RuleFor(x => x.email).NotEmpty();
        RuleFor(x => x.userName).NotEmpty().MaximumLength(UserName.MaxLength);
        RuleFor(x => x.password).NotEmpty().MinimumLength(Password.MinLength).MaximumLength(Password.MaxLength);
    }
}
