using MediatR;
using Microsoft.AspNetCore.Mvc;
using ThickTech.BE.Application;
using ThickTech.BE.Application.Responses;
using ThickTech.BE.Domain.Enums;
using ThickTech.BE.Domain.Shared;
using ThickTech.BE.Infrastructure.Authentication;
using ThickTech.BE.Presentation.Abstractions;
using ThickTech.BE.Presentation.Contracts.Products;

namespace ThickTech.BE.Presentation.Controllers;

[Route("api/product")]
public sealed class ProductsController : ApiController
{
    public ProductsController(ISender sender)
        : base(sender)
    {
    }
    //[HasPermission(Permission.Product)]
    [HttpPost]
    public async Task<IActionResult> CreateProduct(
       [FromBody] CreateProductRequest request,
       CancellationToken cancellationToken)
    {
        var command = new CreateProductCommand(
            request.title,
            request.description,
            request.product_category,
            request.price,
            request.discount_price,
            request.images);
        Result<bool> result = await Sender.Send(command, cancellationToken);
        if (result.IsFailure)
        {
            return HandleFailure(result);
        }
        return CreatedAtAction(
            nameof(CreateProduct),
            new { id = result.Value },
            result.Value);
    }
    [HasPermission(Permission.Product)]
    [HttpGet("get_product_by_category")]
    public async Task<IActionResult> CreateProductByCategory(
       [FromRoute] Guid productCategory,
       CancellationToken cancellationToken)
    {
        var query = new GetProductByCategoryQuery(productCategory);
        Result<List<ProductResponse>> result = await Sender.Send(query, cancellationToken);
        if (result.IsFailure)
        {
            return HandleFailure(result);
        }
        return CreatedAtAction(
            nameof(CreateProductByCategory),
            new { id = result.Value },
            result.Value);
    }
    // [HasPermission(Permission.Product)]
    [HttpGet("get_all_products")]
    public async Task<IActionResult> GetAllProducts(CancellationToken cancellationToken)
    {
        var query = new GetAllProductsQuery();
        Result<List<ProductResponse>> result = await Sender.Send(query, cancellationToken);
        if (result.IsFailure)
        {
            return HandleFailure(result);
        }
        return CreatedAtAction(
            nameof(GetAllProducts),
            new { id = result.Value },
            result.Value);
    }
    // [HasPermission(Permission.Product)]
    [HttpGet("get_product_by_id")]
    public async Task<IActionResult> GetProductById(Guid id, CancellationToken cancellationToken)
    {
        var query = new GetProductByIdQuery(id);
        Result<ProductResponse> result = await Sender.Send(query, cancellationToken);
        if (result.IsFailure)
        {
            return HandleFailure(result);
        }
        return CreatedAtAction(
            nameof(GetProductById),
            new { id = result.Value },
            result.Value);
    }
    // [HasPermission(Permission.Product)]
    [HttpDelete]
    public async Task<IActionResult> DeleteProductById(Guid id, CancellationToken cancellationToken)
    {
        var command = new BaseDeleteCommand(id);
        Result<bool> result = await Sender.Send(command, cancellationToken);
        if (result.IsFailure)
        {
            return HandleFailure(result);
        }
        return CreatedAtAction(
            nameof(DeleteProductById),
            new { id = result.Value },
            result.Value);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateProductById([FromBody] UpdateProductRequest request, CancellationToken cancellationToken)
    {
        var command = new UpdateProductCommand(
            request.product_id,
            request.title,
            request.description,
            request.product_category,
            request.price,
            request.discount_price,
            request.images,
            request.quantity_in,
            request.quantity_out
            );
        Result<bool> result = await Sender.Send(command, cancellationToken);
        if (result.IsFailure)
        {
            return HandleFailure(result);
        }
        return CreatedAtAction(
            nameof(UpdateProductById),
            new { id = result.Value },
            result.Value);
    }
    [HttpPost("get_product_by_ids")]
    public async Task<IActionResult> GetProductByIds(List<Guid> ids, CancellationToken cancellationToken)
    {
        var query = new GetProductByIdsQuery(ids);
        Result<List<ProductResponse>> result = await Sender.Send(query, cancellationToken);
        if (result.IsFailure)
        {
            return HandleFailure(result);
        }
        return CreatedAtAction(
            nameof(GetProductById),
            new { id = result.Value },
            result.Value);
    }
}
