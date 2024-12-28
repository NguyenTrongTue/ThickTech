using ThickTech.BE.Domain.Primitives;

namespace ThickTech.BE.Domain.Entities;
public class Role : Enumeration<Role>
{
    public Role(int id, string name)
        : base(id, name)
    {
    }

    public ICollection<RolePermission> role_permissions { get; set; }
    public ICollection<RoleUser> role_users { get; set; }
}
