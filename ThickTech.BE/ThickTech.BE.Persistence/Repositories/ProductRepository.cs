using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using ThickTech.BE.Persistence.Repositories.Base;
namespace ThickTech.BE.Persistence.Repositories;
public sealed class ProductRepository : BaseRepository<Product>, IProductRepository
{
    private readonly ApplicationDbContext _dbContext;
    private readonly DbSet<Product> _products;

    public ProductRepository(ApplicationDbContext dbContext) : base(dbContext)
    {
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        _products = _dbContext.Set<Product>();
    }
    public async Task<List<Product>> GetProductByCategory(Guid productCategory, CancellationToken cancellationToken = default)
    {
        if (productCategory == Guid.Empty)
            throw new ArgumentNullException(nameof(productCategory));

        return await _products
            .Where(product => product.product_category == productCategory)
            .OrderByDescending(product => product.quantity_out)
            .ToListAsync();
    }

    public async Task<List<Product>> GetByIdsAsync(List<Guid> ids, CancellationToken cancellationToken = default)
    {
        if (ids == null || !ids.Any())
        {
            throw new ArgumentException("The list of IDs cannot be null or empty.", nameof(ids));
        }

        return await _products
            .Where(product => ids.Contains(product.id))
            .ToListAsync(cancellationToken);
    }

}
