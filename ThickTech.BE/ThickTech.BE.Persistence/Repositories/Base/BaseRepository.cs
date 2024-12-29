using Microsoft.EntityFrameworkCore;
using ThickTech.BE.Domain.Repositories.Base;

namespace ThickTech.BE.Persistence.Repositories.Base
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly DbSet<TEntity> _dbSet;
        public BaseRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            _dbSet = _dbContext.Set<TEntity>();
        }
        public void Add(TEntity entity)
        {
            if (entity == null)
                throw new ArgumentNullException(nameof(entity));
            _dbSet.Add(entity);
        }

        public void Update(TEntity entity)
        {
            if (entity == null)
                throw new ArgumentNullException(nameof(entity));

            var trackedEntity = _dbSet.Local.FirstOrDefault(e => e.Equals(entity));
            if (trackedEntity != null)
            {
                _dbContext.Entry(trackedEntity).CurrentValues.SetValues(entity);
            }
            else
            {
                _dbSet.Update(entity);
            }
        }
        public void Delete(Guid id)
        {
            var entity = _dbSet.Find(id);
            if (entity == null)
                throw new KeyNotFoundException($"Entity with ID {id} not found.");
            _dbSet.Remove(entity);
        }
        public async Task<TEntity?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _dbSet.FindAsync(new object[] { id }, cancellationToken);
        }
        public async Task<List<TEntity>> GetAlls(CancellationToken cancellationToken = default)
        {
            return await _dbSet.ToListAsync(cancellationToken);
        }
    }
}
