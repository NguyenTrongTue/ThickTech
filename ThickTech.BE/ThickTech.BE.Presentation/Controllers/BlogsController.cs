using MediatR;
using Microsoft.AspNetCore.Mvc;
using ThickTech.BE.Application;
using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Shared;
using ThickTech.BE.Presentation.Abstractions;
using ThickTech.BE.Presentation.Contracts;

namespace ThickTech.BE.Presentation.Controllers;

[Route(template: "api/blog")]
public sealed class BlogsController : ApiController
{
    public BlogsController(ISender sender)
        : base(sender)
    {
    }
    //[HasPermission(Permission.Product)]
    [HttpPost]
    public async Task<IActionResult> CreateBlog(
       [FromBody] CreateBlogRequest request,
       CancellationToken cancellationToken)
    {
        var command = new CreateBlogCommand(
                request.user_id,
                request.title,
                request.content,
                request.images
            );
        Result<bool> result = await Sender.Send(command, cancellationToken);
        if (result.IsFailure)
        {
            return HandleFailure(result);
        }
        return CreatedAtAction(
            nameof(CreateBlog),
            new { id = result.Value },
            result.Value);
    }
   
    // [HasPermission(Permission.Product)]
    [HttpGet("get_all_blogs")]
    public async Task<IActionResult> GetAllBlogs(CancellationToken cancellationToken)
    {
        var query = new GetAllBlogsQuery();
        Result<List<Blog>> result = await Sender.Send(query, cancellationToken);
        if (result.IsFailure)
        {
            return HandleFailure(result);
        }
        return CreatedAtAction(
            nameof(GetAllBlogs),
            new { id = result.Value },
            result.Value);
    }
    [HttpGet("get_blog_by_id")]
    public async Task<IActionResult> GetBlogById(Guid id, CancellationToken cancellationToken)
    {
        var query = new GetBlogByIdQuery(id);
        Result<Blog> result = await Sender.Send(query, cancellationToken);
        if (result.IsFailure)
        {
            return HandleFailure(result);
        }
        return CreatedAtAction(
            nameof(GetBlogById),
            new { id = result.Value },
            result.Value);
    }
    // [HasPermission(Permission.Product)]
    [HttpDelete]
    public async Task<IActionResult> DeleteBlogById(Guid id, CancellationToken cancellationToken)
    {
        var command = new DeleteBlogCommand(id);
        Result<bool> result = await Sender.Send(command, cancellationToken);
        if (result.IsFailure)
        {
            return HandleFailure(result);
        }
        return CreatedAtAction(
            nameof(DeleteBlogById),
            new { id = result.Value },
            result.Value);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateBlogById([FromBody] UpdateBlogRequest request, CancellationToken cancellationToken)
    {
        var command = new UpdateBlogCommand(
            request.id,
            request.user_id,
            request.title,
            request.content,
            request.images        
            );
        Result<bool> result = await Sender.Send(command, cancellationToken);
        if (result.IsFailure)
        {
            return HandleFailure(result);
        }
        return CreatedAtAction(
            nameof(UpdateBlogById),
            new { id = result.Value },
            result.Value);
    }

}
