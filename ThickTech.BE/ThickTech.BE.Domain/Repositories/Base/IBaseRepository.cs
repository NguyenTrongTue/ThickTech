using ThickTech.BE.Domain.Primitives;

namespace ThickTech.BE.Domain.Repositories.Base
{
    public interface IBaseRepository<TEntity>
    {
        Task<TEntity?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
        void Add(TEntity User);
        void Update(TEntity User);
        void Delete(Guid id);
    }
}
