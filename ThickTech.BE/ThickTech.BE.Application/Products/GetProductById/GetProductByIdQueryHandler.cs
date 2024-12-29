
using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Application.Responses;
using ThickTech.BE.Domain.Errors;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;
namespace ThickTech.BE.Application.Products;
internal sealed class GetProductByIdQueryHandler
    : IQueryHandler<GetProductByIdQuery, ProductResponse>
{
    private readonly IProductRepository _productRepository;

    public GetProductByIdQueryHandler(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public async Task<Result<ProductResponse>> Handle(
        GetProductByIdQuery request,
        CancellationToken cancellationToken)
    {
        var product = await _productRepository.GetByIdAsync(request.id, cancellationToken);        
        if (product is null)
        {
            return Result.Failure<ProductResponse>(DomainErrors.Product.NotFound);
        }
        return new ProductResponse(
                product.id,
                product.title,
                product.description,
                product.product_category,
                product.price.Value,
                product.discount_price,
                product.images,
                is_best_seller: product.quantity_out > 10,
                product.quantity_in,
                product.quantity_out
            );
       
    }
}