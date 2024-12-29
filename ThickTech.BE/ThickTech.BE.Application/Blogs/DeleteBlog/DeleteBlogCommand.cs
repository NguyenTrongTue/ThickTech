using ThickTech.BE.Application.Abstractions;
namespace ThickTech.BE.Application;

public sealed record DeleteBlogCommand(Guid id) : ICommand<bool>;
