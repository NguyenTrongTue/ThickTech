using Microsoft.AspNetCore.Http;
using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Enums;

namespace ThickTech.BE.Application.Files
{
    public sealed record CreateFileCommand(
        List<IFormFile> formFiles, FileType fileType
    ) : ICommand<string>;

}
