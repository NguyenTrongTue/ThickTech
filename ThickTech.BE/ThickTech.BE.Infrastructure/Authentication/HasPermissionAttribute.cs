using ThickTech.BE.Domain.Enums;
using Microsoft.AspNetCore.Authorization;

namespace ThickTech.BE.Infrastructure.Authentication;

public sealed class HasPermissionAttribute : AuthorizeAttribute
{
    public HasPermissionAttribute(Permission permission)
        : base(policy: permission.ToString())
    {
    }
}
