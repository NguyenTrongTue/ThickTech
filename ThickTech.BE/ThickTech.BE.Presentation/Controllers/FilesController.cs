using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ThickTech.BE.Application.Files;
using ThickTech.BE.Domain.Enums;
using ThickTech.BE.Domain.Shared;
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
    [HttpPost("add_file")]
    public async Task<IActionResult> AddFile(List<IFormFile> formFiles, FileType fileType, CancellationToken cancellationToken)
    {
        var commnad = new CreateFileCommand(formFiles, fileType);
        Result<string> response = await Sender.Send(commnad, cancellationToken);
        return response.IsSuccess ? Ok(response.Value) : NotFound(response.Error);
    }
    [HttpPost("delete_file")]
    public async Task<IActionResult> DeleteFile(string fileName, FileType fileType, CancellationToken cancellationToken)
    {
        var commnad = new DeleteFileCommand(fileName, fileType);
        Result<bool> response = await Sender.Send(commnad, cancellationToken);
        return response.IsSuccess ? Ok(response.Value) : NotFound(response.Error);
    }
}
