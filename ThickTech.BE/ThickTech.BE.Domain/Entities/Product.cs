using System.Security.Cryptography;
using ThickTech.BE.Domain.DomainEvents;
using ThickTech.BE.Domain.Primitives;
using ThickTech.BE.Domain.ValueObjects;

namespace ThickTech.BE.Domain.Entities;

public sealed class Product : AggregateRoot, IAuditableEntity
{
    private Product(Guid id, string _title, string _desctiption, int _product_category, decimal _price, decimal _discount_pirce)
        : base(id)
    {
        title = _title;
        description = _desctiption;
        product_category = _product_category;
        price = _price;
        discount_price = _discount_pirce;
    }

    private Product()
    {
    }
    public string title { get; private set; }
    public string description { get; private set; }

    public int product_category { get; private set; }
    public decimal price { get; private set; }
    public decimal discount_price { get; private set; }
    public DateTime created_date { get; set; }
    public DateTime? modified_date { get; set; }


}
