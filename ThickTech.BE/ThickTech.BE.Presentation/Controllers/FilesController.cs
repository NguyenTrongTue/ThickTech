using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ThickTech.BE.Application.Users;
using ThickTech.BE.Domain.Enums;
using ThickTech.BE.Domain.Shared;
using ThickTech.BE.Infrastructure.Authentication;
using ThickTech.BE.Presentation.Abstractions;

namespace ThickTech.BE.Presentation.Controllers;

[Route("api/file")]
public class FilesController : ApiController
{
    public FilesController(ISender sender)
        : base(sender)
    {
    }
    //[HasPermission(Permission.Product)]
    //[HttpGet("{id:guid}")]
    //public async Task<IActionResult> GetUserById(IFormFile formFile, CancellationToken cancellationToken)
    //{
    //    var query = new GetUserByIdQuery(formFile);
    //    Result<UserResponse> response = await Sender.Send(query, cancellationToken);
    //    return response.IsSuccess ? Ok(response.Value) : NotFound(response.Error);
    //}
}
