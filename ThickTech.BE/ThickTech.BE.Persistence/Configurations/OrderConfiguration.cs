using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Persistence.Constants;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ThickTech.BE.Persistence.Configurations;

internal sealed class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.ToTable(TableNames.orders);

        // Khóa chính
        builder.HasKey(x => x.id);

        // Thuộc tính
        builder.Property(x => x.address)
            .IsRequired()
            .HasMaxLength(500); // Giới hạn độ dài của address nếu cần

        builder.Property(x => x.created_date)
            .IsRequired();
        builder.Property(x => x.order_status)
            .IsRequired();

        // Khóa ngoại đến bảng User
        builder.HasOne(x => x.user)
            .WithMany() // Không có collection Orders trong User
            .HasForeignKey(x => x.user_id)
            .OnDelete(DeleteBehavior.Cascade); // Xóa Order khi xóa User

        // Khóa ngoại đến bảng Product
        builder.HasOne(x => x.product)
            .WithMany() // Không có collection Orders trong Product
            .HasForeignKey(x => x.product_id)
            .OnDelete(DeleteBehavior.Restrict); // Không cho phép xóa Product khi có Order liên quan
    }
}
