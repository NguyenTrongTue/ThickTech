using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.ValueObjects;
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

}
