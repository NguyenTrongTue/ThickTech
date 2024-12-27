namespace ThickTech.BE.Domain.Entities;

public class RolePermission
{
    public int role_id { get; set; }

    public int permission_id { get; set; }
    public Role role { get; set; }
    public Permission permission { get; set; }
}
