using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using ThickTech.BE.Persistence.Repositories.Base;
namespace ThickTech.BE.Persistence.Repositories;
public sealed class OrderRepository : BaseRepository<Order>, IOrderRepository
{
    private readonly ApplicationDbContext _dbContext;
    private readonly DbSet<Order> _orders;

    public OrderRepository(ApplicationDbContext dbContext) : base(dbContext)
    {
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        _orders = _dbContext.Set<Order>();
    }   
}
