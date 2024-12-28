using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Entities;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace ThickTech.BE.Infrastructure.Authentication;

public sealed class JwtProvider : IJwtProvider
{
    private readonly JwtOptions _options;
    private readonly IPermissionService _permissionService;

    public JwtProvider(IOptions<JwtOptions> options, IPermissionService permissionService)
    {
        _permissionService = permissionService;
        _options = options.Value;
    }

    public async Task<string> GenerateAsync(User user)
    {
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.id.ToString()),
            new(JwtRegisteredClaimNames.Email, user.email.Value)
        };

        List<string> permissions = await _permissionService
            .GetPermissionsAsync(user.id);

        foreach (string permission in permissions)
        {
            claims.Add(new(CustomClaims.Permissions, permission));
        }

        var signingCredentials = new SigningCredentials(
            new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_options.SecretKey)),
            SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            _options.Issuer,
            _options.Audience,
            claims,
            null,
            DateTime.UtcNow.AddHours(1),
            signingCredentials);

        string tokenValue = new JwtSecurityTokenHandler()
            .WriteToken(token);

        return tokenValue;
    }
}
