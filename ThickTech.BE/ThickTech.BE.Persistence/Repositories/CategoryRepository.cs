using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using ThickTech.BE.Persistence.Repositories.Base;
namespace ThickTech.BE.Persistence.Repositories;
public sealed class CategoryRepository : BaseRepository<Category>, ICategoryRepository
{
    private readonly ApplicationDbContext _dbContext;
    private readonly DbSet<Category> _categories;

    public CategoryRepository(ApplicationDbContext dbContext) : base(dbContext)
    {
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        _categories = _dbContext.Set<Category>();
    }   
}
