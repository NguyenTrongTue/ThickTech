using ThickTech.BE.Application.Abstractions;
namespace ThickTech.BE.Application;

public sealed record DeleteProductCommand(Guid id) : ICommand<bool>;
