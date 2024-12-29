using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;
using ThickTech.BE.Domain.ValueObjects;
namespace ThickTech.BE.Application;
internal sealed class CreateProductCommandHandler : ICommandHandler<CreateProductCommand, bool>
{
    private readonly IProductRepository _productRepository;
    private readonly IUnitOfWork _unitOfWork;

    public CreateProductCommandHandler(
        IProductRepository productRepository,
        IUnitOfWork unitOfWork
        )
    {
        _productRepository = productRepository;
        _unitOfWork = unitOfWork;
    }
    public async Task<Result<bool>> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
        Result<Price> priceResult = Price.Create(request.price);
        if (priceResult.IsFailure)
        {
            return Result.Failure<bool>(priceResult.Error);
        }
        Result<DiscountPrice> discountPriceResult = DiscountPrice.Create(request.discount_price, request.price);
        if (discountPriceResult.IsFailure)
        {
            return Result.Failure<bool>(discountPriceResult.Error);
        }
        var product = Product.Create(
            Guid.NewGuid(),
            request.title,
            request.description,
            request.product_category,
            priceResult.Value,
            discountPriceResult.Value.Value,
            request.images);

        _productRepository.Add(product);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return true;
    }
}
