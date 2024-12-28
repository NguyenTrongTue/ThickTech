using FluentValidation;
using ThickTech.BE.Domain.ValueObjects;
namespace ThickTech.BE.Application.Members;
internal class CreateProductCommandValidator : AbstractValidator<CreateProductCommand>
{
    public CreateProductCommandValidator()
    {
        RuleFor(x => x.title).NotEmpty();
        RuleFor(x => x.price).GreaterThan(Price.MinValue);
        RuleFor(x => x.discount_price).GreaterThan(DiscountPrice.MinValue);
    }
}
