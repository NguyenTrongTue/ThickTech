using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Persistence;
using Microsoft.EntityFrameworkCore;

namespace ThickTech.BE.Infrastructure.Authentication;

public class PermissionService : IPermissionService
{
    private readonly ApplicationDbContext _context;

    public PermissionService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<string>> GetPermissionsAsync(Guid userId)
    {
        var permissions = await _context.Set<RoleUser>()
             .Where(x => x.user_id == userId)
               .SelectMany(ru => ru.role.role_permissions)
           .Select(rp => rp.permission.name)
            .Distinct()
           .ToListAsync();
        return permissions;

    }
}
