using FluentValidation;
using ThickTech.BE.Domain.ValueObjects;
namespace ThickTech.BE.Application;
internal class CreateCategoryCommandValidator : AbstractValidator<CreateCategoryCommand>
{
    public CreateCategoryCommandValidator()
    {
        RuleFor(x => x.category_name).NotEmpty();
        RuleFor(x => x.category_slug).NotEmpty();
    }
}
