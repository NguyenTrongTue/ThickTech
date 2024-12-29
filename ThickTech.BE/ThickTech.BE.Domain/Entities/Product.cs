using ThickTech.BE.Domain.DomainEvents;
using ThickTech.BE.Domain.Primitives;
using ThickTech.BE.Domain.ValueObjects;
namespace ThickTech.BE.Domain.Entities;
public sealed class Product : AggregateRoot, IAuditableEntity
{
    private Product(Guid id, string _title, string _desctiption, Guid _product_category, Price _price, decimal _discount_pirce, string _images)
        : base(id)
    {
        title = _title;
        description = _desctiption;
        product_category = _product_category;
        price = _price;
        discount_price = _discount_pirce;
        images = _images;
        quantity_in = 0;
        quantity_out = 0;
    }

    public Product(Guid id,
        string _title, 
        string _desctiption,
        Guid _product_category, 
        Price _price, 
        decimal _discount_pirce, 
        string _images,
        int _quantity_in, 
        int _quantity_out
    )
        : base(id)
    {
        title = _title;
        description = _desctiption;
        product_category = _product_category;
        price = _price;
        discount_price = _discount_pirce;
        images = _images;
        quantity_in = _quantity_in;
        quantity_out = _quantity_out;
    }
    private Product()
    {
    }
    public string title { get; private set; }
    public string description { get; private set; }
    public Guid product_category { get; private set; }
    public Price price { get; private set; }
    public decimal discount_price { get; private set; }
    public string images { get; private set; }
    public int quantity_in { get; set; }
    public int quantity_out { get; set; }
    public DateTime created_date { get; set; }
    public DateTime? modified_date { get; set; }

    public Category category { get; set; }
    public static Product Create(
       Guid id,
       string title, string desctiption, Guid product_category, Price price, decimal discount_pirce, string images)
    {
        var Product = new Product(
            id,
            title,
            desctiption,
            product_category,
            price,
            discount_pirce,
            images
            );

        Product.RaiseDomainEvent(new UserRegisteredDomainEvent(
            Guid.NewGuid(),
            Product.id));
        return Product;
    }
}
