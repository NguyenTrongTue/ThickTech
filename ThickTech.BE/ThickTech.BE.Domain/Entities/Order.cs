using ThickTech.BE.Domain.Enums;
using ThickTech.BE.Domain.Primitives;
using ThickTech.BE.Domain.ValueObjects;

namespace ThickTech.BE.Domain.Entities;

public sealed class Order : AggregateRoot, IAuditableEntity
{
    private Order(Guid id,
        Guid _user_id,
        Guid _product_id,
        decimal _price,
        int _quantity,
        string _address,
        OrderStatus _order_status
        )
        : base(id)
    {
        user_id = _user_id;
        product_id = _product_id;
        price = _price;
        quantity = _quantity;
        address = _address;
        order_status = _order_status;
    }

    private Order()
    {
    }
    public Guid user_id { get; private set; }
    public Guid product_id { get; private set; }
    public decimal price { get; private set; }
    public int quantity { get; private set; }
    public string address { get; private set; }
    public OrderStatus order_status { get; private set; }
    public DateTime created_date { get; set; }
    public DateTime? modified_date { get; set; }
    public User user { get; set; }
    public Product product { get; set; }
    public static Order Create(
        Guid id,
        Guid user_id,
        Guid product_id,
        decimal price,
        int quantity,
        string address,
        OrderStatus order_status
       )
    {
        var Order = new Order(
            id,
            user_id,
            product_id,
            price,
            quantity,
            address,
            order_status
            );
        return Order;
    }
}
