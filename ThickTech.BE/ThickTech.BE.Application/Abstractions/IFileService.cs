using Microsoft.AspNetCore.Http;
using TagLib;

namespace ThickTech.BE.Application.Abstractions
{
    public interface IFileService
    {
        public string GenerateFileNameAsync(IFormFile file);
        public void SavePictureToFile(IPicture picture, string filePath);
    }
}
