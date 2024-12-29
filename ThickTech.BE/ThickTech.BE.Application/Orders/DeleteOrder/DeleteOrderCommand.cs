using ThickTech.BE.Application.Abstractions;
namespace ThickTech.BE.Application;

public sealed record DeleteOrderCommand(Guid id) : ICommand<bool>;
