namespace ThickTech.BE.Presentation.Contracts.Products
{
    public sealed record CreateProductRequest(
        string title,
        string description,
        Guid product_category,
        decimal price,
        decimal discount_price,
        string images);

}
