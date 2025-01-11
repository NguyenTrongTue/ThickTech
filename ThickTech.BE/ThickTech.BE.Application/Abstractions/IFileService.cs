using Microsoft.AspNetCore.Http;
using TagLib;
using ThickTech.BE.Domain.Enums;

namespace ThickTech.BE.Application.Abstractions
{
    public interface IFileService
    {
        public string GenerateFileNameAsync(IFormFile file);
        public void SavePictureToFile(IPicture picture, string filePath);
        string GetPath(FileType type);

        Task HandleDeleteFileTemp();
    }
}
