namespace ThickTech.BE.Presentation.Contracts;

public sealed record RegisterUserRequest(
    string email,
    string userName,
    string password);
