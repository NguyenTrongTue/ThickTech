using Microsoft.Extensions.Configuration;
using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Errors;
using ThickTech.BE.Domain.Shared;
namespace ThickTech.BE.Application.Files;
internal sealed class DeleteFileCommandHandler : ICommandHandler<DeleteFileCommand, bool>
{
    private readonly IConfiguration _configuration;
    private readonly IFileService _fileService;
    public DeleteFileCommandHandler(
    IConfiguration configuration
    , IFileService fileService)
    {
        _configuration = configuration;
        _fileService = fileService;
    }

    public async Task<Result<bool>> Handle(DeleteFileCommand request, CancellationToken cancellationToken)
    {
        try
        {
            // Lấy đường dẫn thư mục dựa trên FileType
            string path = _fileService.GetPath(request.fileType);
            // Xây dựng đường dẫn đầy đủ của file
            var exactPath = Path.Combine(Directory.GetCurrentDirectory(), $"wwwroot/{path}", request.fileName);
            // Kiểm tra nếu file tồn tại
            if (File.Exists(exactPath))
            {
                // Xóa file
                File.Delete(exactPath);
                return Result.Success<bool>(true);
            }
            else
            {
                return Result.Failure<bool>(DomainErrors.File.NotFound);
            }

        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

}
