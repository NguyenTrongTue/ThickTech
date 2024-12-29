using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.ValueObjects;
using ThickTech.BE.Persistence.Constants;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ThickTech.BE.Persistence.Configurations;

internal sealed class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable(TableNames.products);
        builder.HasKey(x => x.id);

        builder
           .Property(x => x.price)
           .HasConversion(x => x.Value, v => Price.Create(v).Value);

        // Thiết lập khóa ngoại đến bảng Category
        builder.HasOne(x => x.category)
            .WithMany() // Không có collection Product trong Category
            .HasForeignKey(x => x.product_category)
            .OnDelete(DeleteBehavior.Cascade); // Xóa blog khi xóa category
    }
}
