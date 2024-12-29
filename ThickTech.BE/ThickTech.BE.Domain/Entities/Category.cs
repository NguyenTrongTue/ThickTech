using System.Security.Cryptography;
using ThickTech.BE.Domain.DomainEvents;
using ThickTech.BE.Domain.Primitives;
using ThickTech.BE.Domain.ValueObjects;

namespace ThickTech.BE.Domain.Entities;

public sealed class Category : AggregateRoot, IAuditableEntity
{
    private Category(Guid id, string _category_name, string _category_slug)
        : base(id)
    {
        category_name = _category_name;
        category_slug = _category_slug;
    }

    private Category()
    {
    }
    public string category_name { get; private set; }
    public string category_slug { get; private set; }
    public DateTime created_date { get; set; }
    public DateTime? modified_date { get; set; }

    public static Category Create(
       Guid id,
       string category_name, string category_slug)
    {
        var Category = new Category(
            id,
            category_name,
            category_slug
            );
        return Category;
    }
}
