using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Enums;
using ThickTech.BE.Domain.Errors;
using ThickTech.BE.Domain.Primitives;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;

namespace ThickTech.BE.Application.Files;

internal sealed class CreateFileCommandHandler : ICommandHandler<CreateFileCommand, string>
{
    private readonly IConfiguration _configuration;
    private readonly IFileService _fileService;
    private readonly IFileRepository _fileRepository;
    private readonly IUnitOfWork _unitOfWork;
    public CreateFileCommandHandler(
    IConfiguration configuration, IFileService fileService, IFileRepository fileRepository, IUnitOfWork unitOfWork)
    {
        _configuration = configuration;
        _fileService = fileService;
        _fileRepository = fileRepository;
        _unitOfWork = unitOfWork;
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

                var fileEntity = new FileEntity()
                {
                    file_id = Guid.NewGuid(),
                    file_name = fileResult.FileName,
                    file_type = (int)request.fileType,
                    is_temp = true,
                    created_at = DateTime.UtcNow,
                };
                await _fileRepository.Add(fileEntity);
            }

            await _unitOfWork.SaveChangesAsync();
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
            string path = _fileService.GetPath(type);
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
}
