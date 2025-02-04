using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Repositories.Base;
namespace ThickTech.BE.Domain.Repositories;
public interface IProductRepository : IBaseRepository<Product>
{
    Task<List<Product>> GetProductByCategory(Guid productCategory, CancellationToken cancellationToken = default);  

    Task<List<Product>> GetByIdsAsync(List<Guid> ids, CancellationToken cancellationToken = default);  

}
