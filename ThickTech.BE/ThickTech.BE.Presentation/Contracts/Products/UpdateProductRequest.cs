namespace ThickTech.BE.Presentation.Contracts.Products
{
    public sealed record UpdateProductRequest(
        Guid product_id,
        string title,
        string description,
        Guid product_category,
        decimal price,
        decimal discount_price,
        string images,
        int quantity_in,
        int quantity_out);

}
