using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using TagLib;
using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Enums;
using ThickTech.BE.Domain.Repositories;

namespace ThickTech.BE.Infrastructure.Services
{
    public class FileService : IFileService
    {
        private readonly IFileRepository _fileRepository;
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _unitOfWork;

        public FileService(IFileRepository fileRepository, IConfiguration configuration, IUnitOfWork unitOfWork)
        {
            _fileRepository = fileRepository;
            _configuration = configuration;
            _unitOfWork = unitOfWork;
        }

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

        public string GetPath(FileType type)
        {
            string result = "";
            switch (type)
            {
                case FileType.Product:
                    result = "Products";
                    break;
                case FileType.Blog:
                    result = "Blogs";
                    break;
                case FileType.Club:
                    result = "Clubs";
                    break;
                default:
                    break;
            }
            return result;
        }
        public async Task HandleDeleteFileTemp()
        {
            try
            {
                var fileTemps = await _fileRepository.GetFileTemp();
                foreach (var fileTemp in fileTemps)
                {
                    DeleteFile(fileTemp.file_name, fileTemp.file_type);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        private void DeleteFile(string fileName, int typeFile)
        {
            try
            {
                string path = GetPath((FileType)typeFile);
                var exactPath = Path.Combine(Directory.GetCurrentDirectory(), $"wwwroot/{path}", fileName);
                if (System.IO.File.Exists(exactPath))
                {
                    System.IO.File.Delete(exactPath);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
