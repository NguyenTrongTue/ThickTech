using System.Security.Cryptography;
using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Errors;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;
using ThickTech.BE.Domain.ValueObjects;

namespace ThickTech.BE.Application.Users;

internal sealed class CreateUserCommandHandler : ICommandHandler<CreateUserCommand, Guid>
{
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;

    public CreateUserCommandHandler(
        IUserRepository userRepository,
        IUnitOfWork unitOfWork
        )
    {
        _unitOfWork = unitOfWork;
        _userRepository = userRepository;
    }

    public async Task<Result<Guid>> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        Result<Email> emailResult = Email.Create(request.email);

        if (emailResult.IsFailure)
        {
            return Result.Failure<Guid>(emailResult.Error);
        }

        Result<Password> passwordResult = Password.Create(request.password);

        if (passwordResult.IsFailure)
        {
            return Result.Failure<Guid>(passwordResult.Error);
        }

        Result<UserName> userNameResult = UserName.Create(request.userName);

        if (!await _userRepository.IsEmailUniqueAsync(emailResult.Value, cancellationToken))
        {
            return Result.Failure<Guid>(DomainErrors.User.EmailAlreadyInUse);
        }
        this.CreatePasswordHash(passwordResult.Value.Value, out byte[] passwordHash, out byte[] passwordSalt);
        var user = User.Create(
            Guid.NewGuid(),
            emailResult.Value,
            userNameResult.Value,
            passwordHash, passwordSalt);

        await _userRepository.Add(user);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return user.id;
    }
    private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
        using (var hmac = new HMACSHA512())
        {
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }
    }
}
