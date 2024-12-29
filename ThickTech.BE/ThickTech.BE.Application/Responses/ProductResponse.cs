namespace ThickTech.BE.Application.Responses
{
    public record ProductResponse(
        Guid product_id,
        string title,
        string description,
        Guid product_category,
        decimal price,
        decimal discount_price,
        string images,
        bool is_best_seller,
        int quantity_in,
        int quantity_out);
}
