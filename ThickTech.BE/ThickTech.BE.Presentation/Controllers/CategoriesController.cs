using MediatR;
using Microsoft.AspNetCore.Mvc;
using ThickTech.BE.Application;
using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Shared;
using ThickTech.BE.Presentation.Abstractions;
using ThickTech.BE.Presentation.Contracts;

namespace ThickTech.BE.Presentation.Controllers;

[Route(template: "api/category")]
public sealed class CategoriesController : ApiController
{
    public CategoriesController(ISender sender)
        : base(sender)
    {
    }
    //[HasPermission(Permission.Product)]
    [HttpPost]
    public async Task<IActionResult> CreateCategory(
       [FromBody] CreateCategoryRequest request,
       CancellationToken cancellationToken)
    {
        var command = new CreateCategoryCommand(
            request.category_name,
            request.category_slug
            );
        Result<bool> result = await Sender.Send(command, cancellationToken);
        if (result.IsFailure)
        {
            return HandleFailure(result);
        }
        return CreatedAtAction(
            nameof(CreateCategory),
            new { id = result.Value },
            result.Value);
    }
   
    // [HasPermission(Permission.Product)]
    [HttpGet("get_all_categories")]
    public async Task<IActionResult> GetAllCategories(CancellationToken cancellationToken)
    {
        var query = new GetAllCategoriesQuery();
        Result<List<Category>> result = await Sender.Send(query, cancellationToken);
        if (result.IsFailure)
        {
            return HandleFailure(result);
        }
        return CreatedAtAction(
            nameof(GetAllCategories),
            new { id = result.Value },
            result.Value);
    }
    // [HasPermission(Permission.Product)]
    [HttpDelete]
    public async Task<IActionResult> DeleteCategoryById(Guid id, CancellationToken cancellationToken)
    {
        var command = new BaseDeleteCommand(id);
        Result<bool> result = await Sender.Send(command, cancellationToken);
        if (result.IsFailure)
        {
            return HandleFailure(result);
        }
        return CreatedAtAction(
            nameof(DeleteCategoryById),
            new { id = result.Value },
            result.Value);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateCategoryById([FromBody] UpdateCategoryRequest request, CancellationToken cancellationToken)
    {
        var command = new UpdateCategoryCommand(
            request.id,
            request.category_name,
            request.category_slug            
            );
        Result<bool> result = await Sender.Send(command, cancellationToken);
        if (result.IsFailure)
        {
            return HandleFailure(result);
        }
        return CreatedAtAction(
            nameof(UpdateCategoryById),
            new { id = result.Value },
            result.Value);
    }

}
