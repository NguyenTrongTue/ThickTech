using ThickTech.BE.Domain.Primitives;

namespace ThickTech.BE.Domain.Repositories.Base
{
    public interface IBaseRepository<TEntity>
    {
        Task<TEntity?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
        Task Add(TEntity entity);
        void Update(TEntity entity);
        void Delete(Guid id);

        Task<List<TEntity>> GetAlls(CancellationToken cancellationToken = default);
    }
}
