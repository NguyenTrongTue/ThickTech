namespace ThickTech.BE.Domain.Entities;

public class Permission
{
    public int id { get; init; }

    public string name { get; init; } = string.Empty;

    public ICollection<RolePermission> role_permissions { get; set; } 
}
