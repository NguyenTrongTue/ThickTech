using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Errors;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;
using ThickTech.BE.Domain.ValueObjects;
namespace ThickTech.BE.Application;
internal sealed class UpdateProductCommandHandler : ICommandHandler<UpdateProductCommand, bool>
{
    private readonly IProductRepository _productRepository;
    private readonly IUnitOfWork _unitOfWork;

    public UpdateProductCommandHandler(
        IProductRepository productRepository,
        IUnitOfWork unitOfWork
        )
    {
        _productRepository = productRepository;
        _unitOfWork = unitOfWork;
    }
    public async Task<Result<bool>> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
        var productExist = await _productRepository.GetByIdAsync(request.id, cancellationToken);
        if (productExist is null)
        {
            return Result.Failure<bool>(DomainErrors.Product.NotFound);
        }
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
        var product = new Product(
            request.id,
            request.title,
            request.description,
            request.product_category,
            priceResult.Value,
            discountPriceResult.Value.Value,
            request.images,
            request.quantity_in,
            request.quantity_out);

        _productRepository.Update(product);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return true;
    }
}
