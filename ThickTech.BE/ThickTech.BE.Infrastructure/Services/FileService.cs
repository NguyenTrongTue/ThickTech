using Microsoft.AspNetCore.Http;
using TagLib;
using ThickTech.BE.Application.Abstractions;

namespace ThickTech.BE.Infrastructure.Services
{
    public class FileService : IFileService
    {
        public string GenerateFileNameAsync(IFormFile file)
        {
            string fileName = "";

            var extension = Path.GetExtension(file.FileName);
            var fileId = Guid.NewGuid();
            fileName = fileId + extension;

            return fileName;
        }

        public void SavePictureToFile(IPicture picture, string filePath)
        {
            try
            {
                using (FileStream fs = System.IO.File.Create(filePath))
                {
                    fs.Write(picture.Data.Data, 0, picture.Data.Count);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
