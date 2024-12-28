using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using ThickTech.BE.Persistence.Repositories.Base;

namespace ThickTech.BE.Persistence.Repositories;

public sealed class UserRepository : BaseRepository<User>, IUserRepository
{
    private readonly ApplicationDbContext _dbContext;
    private readonly DbSet<User> _users;

    public UserRepository(ApplicationDbContext dbContext) : base(dbContext)
    {
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        _users = _dbContext.Set<User>();
    }
    public async Task<User?> GetByEmailAsync(Email email, CancellationToken cancellationToken = default)
    {
        if (email == null)
            throw new ArgumentNullException(nameof(email));

        return await _users
            .FirstOrDefaultAsync(user => user.email == email, cancellationToken);
    }
    public async Task<bool> IsEmailUniqueAsync(Email email, CancellationToken cancellationToken = default)
    {
        if (email == null)
            throw new ArgumentNullException(nameof(email));
        return !await _users
            .AnyAsync(user => user.email == email, cancellationToken);
    }
}
