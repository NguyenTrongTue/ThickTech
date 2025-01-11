using Microsoft.EntityFrameworkCore;
using ThickTech.BE.Domain.Primitives;
using ThickTech.BE.Domain.Repositories.Base;
using ThickTech.BE.Domain.Shared;

namespace ThickTech.BE.Persistence.Repositories.Base
{
    public class BaseMasterDetailRepository<TMaster, TDetail> : IBaseMasterDetailRepository<TMaster, TDetail>
        where TMaster : AggregateRoot, IAuditableEntity
        where TDetail : class
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly DbSet<TMaster> _dbMasterSet;
        private readonly DbSet<TDetail> _dbDetailSet;

        public BaseMasterDetailRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            _dbMasterSet = _dbContext.Set<TMaster>();
            _dbDetailSet = _dbContext.Set<TDetail>();
        }

        // Thêm mới master và danh sách detail
        public async Task Add(Request<TMaster, TDetail> request)
        {
            if (request == null) throw new ArgumentNullException(nameof(request));

            await _dbMasterSet.AddAsync(request.Master);
            await _dbDetailSet.AddRangeAsync(request.Details);
            await _dbContext.SaveChangesAsync();
        }

        // Xóa master và các detail liên quan
        public async void Delete(Guid id)
        {
            var master = await _dbMasterSet.FindAsync(id);
            if (master == null) throw new KeyNotFoundException("Master not found.");

            // Xóa các detail liên quan
            var details = _dbDetailSet.Where(d => EF.Property<Guid>(d, "master_id") == id);
            _dbDetailSet.RemoveRange(details);
            _dbMasterSet.Remove(master);
        }

        // Lấy danh sách tất cả master
        public async Task<List<TMaster>> GetAlls(CancellationToken cancellationToken = default)
        {
            return await _dbMasterSet
                .Include(m => EF.Property<ICollection<TDetail>>(m, "details"))
                .ToListAsync(cancellationToken);
        }

        // Lấy master theo ID
        public async Task<TMaster> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var master = await _dbMasterSet
                .Include(m => EF.Property<ICollection<TDetail>>(m, "details"))
                .FirstOrDefaultAsync(m => EF.Property<Guid>(m, "id") == id, cancellationToken);

            if (master == null)
                throw new KeyNotFoundException("Master not found.");

            return master;
        }


        // Cập nhật master và danh sách detail
        public async void Update(Request<TMaster, TDetail> request)
        {
            if (request == null) throw new ArgumentNullException(nameof(request));

            // Cập nhật Master
            var existingMaster = await _dbMasterSet.FindAsync(request.Master.id);
            if (existingMaster != null)
            {
                _dbContext.Entry(existingMaster).CurrentValues.SetValues(request.Master);
            }
            else
            {
                await _dbMasterSet.AddAsync(request.Master);
            }
            // Xóa và thêm mới Details
            var existingDetails = _dbDetailSet.Where(d => EF.Property<Guid>(d, "master_id") == request.Master.id).ToList();
            foreach (var detail in existingDetails)
            {
                _dbContext.Entry(detail).State = EntityState.Detached; // Ngắt theo dõi
            }
            _dbDetailSet.RemoveRange(existingDetails);
            await _dbDetailSet.AddRangeAsync(request.Details);
        }

    }
}
