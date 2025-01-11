using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Enums;

namespace ThickTech.BE.Application.Files
{
    public sealed record DeleteFileCommand(
        string fileName, FileType fileType
    ) : ICommand<bool>;

}
