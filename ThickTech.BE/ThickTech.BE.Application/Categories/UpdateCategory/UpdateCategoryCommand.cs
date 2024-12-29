using ThickTech.BE.Application.Abstractions;
namespace ThickTech.BE.Application;

public sealed record UpdateCategoryCommand(
        Guid id,
        string category_name,
        string category_slug) : ICommand<bool>;
        
