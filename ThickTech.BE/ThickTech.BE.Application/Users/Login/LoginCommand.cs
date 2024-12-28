using ThickTech.BE.Application.Abstractions;

namespace ThickTech.BE.Application.Users;
public record LoginCommand(string email, string password) : ICommand<string>;
