using System.Security.Cryptography;
using ThickTech.BE.Domain.DomainEvents;
using ThickTech.BE.Domain.Primitives;
using ThickTech.BE.Domain.ValueObjects;

namespace ThickTech.BE.Domain.Entities;

public sealed class User : AggregateRoot, IAuditableEntity
{
    private User(Guid id, Email _email, UserName _user_name, byte[] _password_hash,
        byte[] _password_salt)
        : base(id)
    {
        email = _email;
        user_name = _user_name;
        password_hash = _password_hash;
        password_salt = _password_salt;
    }
    private User()
    {
    }
    /// <summary>
    /// Email của người dùng
    /// </summary>
    public Email email { get; private set; }
    /// <summary>
    /// Tên đăng nhập
    /// </summary>
    public UserName user_name { get; private set; }
    /// <summary>
    /// Mật khẩu hash
    /// </summary>
    public byte[] password_hash { get; private set; }
    /// <summary>
    /// Mật khẩu salt
    /// </summary>
    public byte[] password_salt { get; private set; }
    /// <summary>
    /// Ngày tạo tài khoản
    /// </summary>
    public DateTime created_date { get; set; }
    /// <summary>
    /// Ngày sửa thông tin tài khoản
    /// </summary>
    public DateTime? modified_date { get; set; }
    public static User Create(
        Guid id,
        Email email,
        UserName userName,
        byte[] password_hash,
        byte[] password_salt)
    {
        var User = new User(
            id,
            email,
            userName,
            password_hash,
            password_salt
            );

        User.RaiseDomainEvent(new UserRegisteredDomainEvent(
            Guid.NewGuid(),
            User.id));

        return User;
    }



    private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
    {
        using (var hmac = new HMACSHA512(passwordSalt))
        {
            var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            return computedHash.SequenceEqual(passwordHash);
        }
    }
}
