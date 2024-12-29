using ThickTech.BE.Domain.Enums;

namespace ThickTech.BE.Presentation.Contracts
{
    public sealed record CreateOrderRequest(
        Guid user_id,
        Guid product_id,
        decimal price,
        int quantity,
        string address,
        OrderStatus order_status
    );

}
