using ThickTech.BE.Application.Abstractions;
namespace ThickTech.BE.Application;

public sealed record DeleteCategoryCommand(Guid id) : ICommand<bool>;
