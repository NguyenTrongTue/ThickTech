using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;

namespace ThickTech.BE.Persistence.Repositories;

public sealed class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _dbContext;

    public UserRepository(ApplicationDbContext dbContext) =>
        _dbContext = dbContext;

    public async Task<User?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default) =>
        await _dbContext
            .Set<User>()
            .FirstOrDefaultAsync(user => user.id == id, cancellationToken);

    public async Task<User?> GetByEmailAsync(Email email, CancellationToken cancellationToken = default) =>
        await _dbContext
            .Set<User>()
            .FirstOrDefaultAsync(user => user.email == email, cancellationToken);

    public async Task<bool> IsEmailUniqueAsync(
        Email email,
        CancellationToken cancellationToken = default) =>
        !await _dbContext
            .Set<User>()
            .AnyAsync(user => user.email == email, cancellationToken);

    public void Add(User user) =>
        _dbContext.Set<User>().Add(user);

    public void Update(User user) =>
        _dbContext.Set<User>().Update(user);
}
