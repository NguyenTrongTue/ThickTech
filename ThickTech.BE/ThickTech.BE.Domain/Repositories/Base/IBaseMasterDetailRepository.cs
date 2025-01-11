using ThickTech.BE.Domain.Primitives;
using ThickTech.BE.Domain.Shared;

namespace ThickTech.BE.Domain.Repositories.Base
{
    public interface IBaseMasterDetailRepository<TMaster, TDetail>
       where TMaster : IAuditableEntity
    {
        Task<TMaster> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
        Task Add(Request<TMaster, TDetail> request);
        void Update(Request<TMaster, TDetail> request);
        void Delete(Guid id);

        Task<List<TMaster>> GetAlls(CancellationToken cancellationToken = default);
    }
}
