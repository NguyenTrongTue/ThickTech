using ThickTech.BE.Application.Abstractions;
namespace ThickTech.BE.Application;
public sealed record DeleteClubCommand(Guid id) : ICommand<bool>;
