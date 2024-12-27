using ThickTech.BE.Core.Enities;

namespace ThickTech.BE.Core.Interfaces.User;
public interface IUserRepository
{
    public Task<UserEntity> GetUserByEmail(string email);
    public Task<int> AddUser(UserEntity user);
}
