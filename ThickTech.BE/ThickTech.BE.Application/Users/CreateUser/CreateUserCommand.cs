using ThickTech.BE.Application.Abstractions;
namespace ThickTech.BE.Application;

public sealed record CreateUserCommand(
    string email,
    string userName,
    string password) : ICommand<Guid>;
