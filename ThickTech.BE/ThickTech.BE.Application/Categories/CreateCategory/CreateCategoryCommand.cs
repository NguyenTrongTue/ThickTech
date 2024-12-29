using ThickTech.BE.Application.Abstractions;
namespace ThickTech.BE.Application;

public sealed record CreateCategoryCommand(
        string category_name,
        string category_slug) : ICommand<bool>;
