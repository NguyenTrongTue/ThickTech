namespace ThickTech.BE.Domain.Entities;

public class RoleUser
{
    public int role_id { get; set; }

    public Guid user_id { get; set; }

    public Role role { get; set; }

    public User user { get; set; }
}
