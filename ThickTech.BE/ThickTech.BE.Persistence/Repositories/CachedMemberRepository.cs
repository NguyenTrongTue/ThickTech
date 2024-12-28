using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.ValueObjects;
using ThickTech.BE.Persistence.Infrastructure;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
namespace ThickTech.BE.Persistence.Repositories;
public class CachedUserRepository : IUserRepository
{
    private readonly IUserRepository _decorated;
    private readonly IDistributedCache _distributedCache;
    private readonly ApplicationDbContext _dbContext;
    public CachedUserRepository(IUserRepository decorated, IDistributedCache distributedCache, ApplicationDbContext dbContext)
    {
        _decorated = decorated;
        _distributedCache = distributedCache;
        _dbContext = dbContext;
    }
    public async Task<User?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        string key = $"user-{id}";

        string? cachedMember = await _distributedCache.GetStringAsync(
            key,
            cancellationToken);
        User? user;
        if (string.IsNullOrEmpty(cachedMember))
        {
            user = await _decorated.GetByIdAsync(id, cancellationToken);
            if (user is null)
            {
                return user;
            }
            await _distributedCache.SetStringAsync(
                key,
                JsonConvert.SerializeObject(user),
                cancellationToken);
            return user;
        }
        user = JsonConvert.DeserializeObject<User>(
            cachedMember,
            new JsonSerializerSettings
            {
                ConstructorHandling =
                    ConstructorHandling.AllowNonPublicDefaultConstructor,
                ContractResolver = new PrivateResolver()
            });
        if (user is not null)
        {
            _dbContext.Set<User>().Attach(user);
        }
        return user;
    }
    public Task<User?> GetByEmailAsync(Email email, CancellationToken cancellationToken = default) =>
        _decorated.GetByEmailAsync(email, cancellationToken);
    public Task<bool> IsEmailUniqueAsync(Email email, CancellationToken cancellationToken = default) =>
        _decorated.IsEmailUniqueAsync(email, cancellationToken);
    public void Add(User user) => _decorated.Add(user);
    public void Update(User user) => _decorated.Update(user);
}
