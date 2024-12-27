namespace ThickTech.BE.Infrastructure.Authentication;

public interface IPermissionService
{
    Task<List<string>> GetPermissionsAsync(Guid memberId);
}
