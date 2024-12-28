using MediatR;
using Microsoft.AspNetCore.Mvc;
using ThickTech.BE.Application;
using ThickTech.BE.Domain.Enums;
using ThickTech.BE.Domain.Shared;
using ThickTech.BE.Infrastructure.Authentication;
using ThickTech.BE.Presentation.Abstractions;
using ThickTech.BE.Presentation.Contracts;
using ThickTech.BE.Presentation.Contracts.Products;

namespace ThickTech.BE.Presentation.Controllers;

[Route("api/product")]
public sealed class ProductsController : ApiController
{
    public ProductsController(ISender sender)
        : base(sender)
    {
    }
    [HasPermission(Permission.Product)]
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
}
