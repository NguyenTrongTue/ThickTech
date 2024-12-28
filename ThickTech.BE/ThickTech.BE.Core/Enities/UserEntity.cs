namespace ThickTech.BE.Core.Enities;
public class UserEntity
{
    /// <summary>
    /// Email người dùng
    /// </summary>
    public string email { get; set; }
    /// <summary>
    /// Tên người dùng
    /// </summary>
    public string user_name { get; set; }
    /// <summary>
    /// Role user là khách vãng lãi
    /// Role admin là quản trị viện
    /// </summary>
    public string role { get; set; } = "user";
    public byte[] password_hash { get; set; }
    public byte[] password_salt { get; set; }
    public string refresh_token { get; set; } = string.Empty;
    public DateTime token_created { get; set; }
    public DateTime token_expires { get; set; }

}
