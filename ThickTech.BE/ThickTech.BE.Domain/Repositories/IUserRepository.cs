using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.ValueObjects;

namespace ThickTech.BE.Domain.Repositories;

public interface IUserRepository
{
    Task<User?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

    Task<User?> GetByEmailAsync(Email email, CancellationToken cancellationToken = default);

    Task<bool> IsEmailUniqueAsync(Email email, CancellationToken cancellationToken = default);

    void Add(User User);

    void Update(User User);
}
