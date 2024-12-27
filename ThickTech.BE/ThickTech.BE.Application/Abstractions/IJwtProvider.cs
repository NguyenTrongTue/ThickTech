using ThickTech.BE.Domain.Entities;

namespace ThickTech.BE.Application.Abstractions;

public interface IJwtProvider
{
    Task<string> GenerateAsync(User user);
}
