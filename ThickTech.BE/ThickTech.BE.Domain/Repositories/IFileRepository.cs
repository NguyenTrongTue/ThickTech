using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Repositories.Base;
namespace ThickTech.BE.Domain.Repositories;
public interface IFileRepository : IBaseRepository<FileEntity>
{
    Task<List<FileEntity>> GetFileTemp();
    Task<bool> DeleteTempFilesOlderThanAnHour();
}
