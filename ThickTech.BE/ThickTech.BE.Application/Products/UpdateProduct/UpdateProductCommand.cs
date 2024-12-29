using ThickTech.BE.Application.Abstractions;
namespace ThickTech.BE.Application;

public sealed record UpdateProductCommand(Guid id, string title,
        string description,
        Guid product_category,
        decimal price,
        decimal discount_price,
        string images,
        int quantity_in,
        int quantity_out) : ICommand<bool>;
