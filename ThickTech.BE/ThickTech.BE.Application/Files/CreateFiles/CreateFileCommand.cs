using ThickTech.BE.Application.Abstractions;

namespace ThickTech.BE.Application.Files.AddFiles
{
    public sealed record CreateFileCommand(
    string email,
    string userName,
    string password) : ICommand<string>;

}
