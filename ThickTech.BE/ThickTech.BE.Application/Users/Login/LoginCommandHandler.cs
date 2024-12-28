using System.Security.Cryptography;
using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Application.Users;
using ThickTech.BE.Domain.Errors;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;
using ThickTech.BE.Domain.ValueObjects;

namespace ThickTech.BE.Application.Members.Login;

internal sealed class LoginCommandHandler
    : ICommandHandler<LoginCommand, string>
{
    private readonly IUserRepository _userRepository;
    private readonly IJwtProvider _jwtProvider;

    public LoginCommandHandler(
        IUserRepository userRepository,
        IJwtProvider jwtProvider)
    {
        _userRepository = userRepository;
        _jwtProvider = jwtProvider;
    }

    public async Task<Result<string>> Handle(
        LoginCommand request,
        CancellationToken cancellationToken)
    {
        Result<Email> email = Email.Create(request.email);

        var user = await _userRepository.GetByEmailAsync(
            email.Value,
            cancellationToken);

        if (user is null)
        {
            return Result.Failure<string>(
                DomainErrors.User.InvalidCredentials);
        }


        if (!this.VerifyPasswordHash(request.password, user.password_hash, user.password_salt))
        {
            return Result.Failure<string>(DomainErrors.User.InvalidPassword);
        }

        string token = await _jwtProvider.GenerateAsync(user);

        return token;
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
