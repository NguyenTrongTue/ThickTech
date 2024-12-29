using ThickTech.BE.Application.Abstractions;
namespace ThickTech.BE.Application;

public sealed record CreateBlogCommand(
        Guid user_id,
        string title,
        string content,
        string images) : ICommand<bool>;
