using ThickTech.BE.Application.Abstractions;
namespace ThickTech.BE.Application;

public sealed record UpdateBlogCommand(
        Guid id,
        Guid user_id,
        string title,
        string content,
        string images) : ICommand<bool>;
        
