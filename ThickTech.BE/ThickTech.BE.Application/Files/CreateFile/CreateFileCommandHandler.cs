using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Net.Http.Json;
using System.Text.Json.Serialization;
using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Enums;
using ThickTech.BE.Domain.Errors;
using ThickTech.BE.Domain.Primitives;
using ThickTech.BE.Domain.Shared;

namespace ThickTech.BE.Application.Files;

internal sealed class CreateFileCommandHandler : ICommandHandler<CreateFileCommand, string>
{
    private readonly IConfiguration _configuration;
    private readonly IFileService _fileService;
    public CreateFileCommandHandler(
    IConfiguration configuration
    , IFileService fileService)
    {
        _configuration = configuration;
        _fileService = fileService;
    }

    public async Task<Result<string>> Handle(CreateFileCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var allTypes = Enum.GetValues<Domain.Enums.FileType>()
                   .Cast<int>();

            if (!allTypes.Contains((int)request.fileType))
            {
                return Result.Failure<string>(DomainErrors.File.TypeFileError);
            }
            var files = request.formFiles;
            var fileResults = new List<FileObject>();
            foreach (var file in files)
            {
                var fileResult = await WriteFile(file, request.fileType);
                fileResults.Add(fileResult);
            }
            return JsonConvert.SerializeObject(fileResults);
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    private async Task<FileObject> WriteFile(IFormFile file, FileType type)
    {
        try
        {
            string fileName = _fileService.GenerateFileNameAsync(file);
            var baseUrl = _configuration.GetSection("BaseUrl");
            string path = GetPath(type);
            var exactPath = Path.Combine(Directory.GetCurrentDirectory(), $"wwwroot/{path}", fileName);
            using (var stream = new FileStream(exactPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            var fullUrl = baseUrl.Value + "/" + path + "/" + fileName;
            return new FileObject()
            {
                FileName = fileName,
                FileExtension = Path.GetExtension(file.FileName),
                FileUrl = fullUrl,
                FileSize = Math.Round(file.Length / 1024.0, 2)
            };
        }
        catch (Exception)
        {
            throw;
        }
    }

    private string GetPath(FileType type)
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
            default:
                break;
        }
        return result;
    }

}
