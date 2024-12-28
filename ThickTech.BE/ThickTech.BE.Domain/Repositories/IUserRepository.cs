using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Repositories.Base;
using ThickTech.BE.Domain.ValueObjects;

namespace ThickTech.BE.Domain.Repositories;

public interface IUserRepository : IBaseRepository<User>
{
    Task<User?> GetByEmailAsync(Email email, CancellationToken cancellationToken = default);
    Task<bool> IsEmailUniqueAsync(Email email, CancellationToken cancellationToken = default);
}
