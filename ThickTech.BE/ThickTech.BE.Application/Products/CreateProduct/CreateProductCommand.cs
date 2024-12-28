using ThickTech.BE.Application.Abstractions;
namespace ThickTech.BE.Application;

public sealed record CreateProductCommand(
        string title,
        string description,
        int product_category,
        decimal price,
        decimal discount_price,
        string images) : ICommand<bool>;
