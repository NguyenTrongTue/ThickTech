
using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Application.Responses;
using ThickTech.BE.Application.Users;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;

namespace ThickTech.BE.Application.Products;

internal sealed class GetProductByCategoryQueryHandler
    : IQueryHandler<GetProductByCategoryQuery, List<ProductResponse>>
{
    private readonly IProductRepository _productRepository;

    public GetProductByCategoryQueryHandler(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public async Task<Result<List<ProductResponse>>> Handle(
        GetProductByCategoryQuery request,
        CancellationToken cancellationToken)
    {
        var products = await _productRepository.GetProductByCategory(request.productCategory, cancellationToken);
        var productResponses = products
            .Select((product, index) => new ProductResponse(
                product.id,
                product.title,
                product.description,
                product.product_category,
                product.price.Value,
                product.discount_price,
                product.images,
                is_best_seller: index < 10 && product.quantity_out > 10,
                product.quantity_in,
                product.quantity_out
            ))
            .ToList();
        return productResponses;
    }
}