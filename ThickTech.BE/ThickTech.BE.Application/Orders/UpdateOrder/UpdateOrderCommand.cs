using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Enums;
namespace ThickTech.BE.Application;

public sealed record UpdateOrderCommand(
        Guid id,
        Guid user_id,
        Guid product_id,
        decimal price,
        int quantity,
        string address,
        OrderStatus order_status) : ICommand<bool>;
        
