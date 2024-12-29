using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using ThickTech.BE.Persistence.Repositories.Base;
namespace ThickTech.BE.Persistence.Repositories;
public sealed class BlogRepository : BaseRepository<Blog>, IBlogRepository
{
    private readonly ApplicationDbContext _dbContext;
    private readonly DbSet<Blog> _blogs;

    public BlogRepository(ApplicationDbContext dbContext) : base(dbContext)
    {
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        _blogs = _dbContext.Set<Blog>();
    }   
}
