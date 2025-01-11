using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using ThickTech.BE.Persistence.Repositories.Base;

namespace ThickTech.BE.Persistence.Repositories;
public sealed class FileRepository : BaseRepository<FileEntity>, IFileRepository
{
    private readonly ApplicationDbContext _dbContext;
    private readonly DbSet<FileEntity> _files;
    public FileRepository(ApplicationDbContext dbContext) : base(dbContext)
    {
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        _files = _dbContext.Set<FileEntity>();
    }

    public async Task<bool> DeleteTempFilesOlderThanAnHour()
    {
        try
        {
            var utcNow = DateTime.UtcNow;
            var filesToDelete = await _files
                .Where(f => f.is_temp && f.created_at < utcNow.AddHours(-1))
                .ToListAsync();
            _files.RemoveRange(filesToDelete);
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error deleting temporary files: {ex.Message}");
            return false;
        }
    }

    public async Task<List<FileEntity>> GetFileTemp()
    {
        var utcNow = DateTime.UtcNow;
        return await _files
            .Where(file => file.is_temp == true && file.created_at < utcNow.AddHours(-1))
            .ToListAsync();
    }
}
