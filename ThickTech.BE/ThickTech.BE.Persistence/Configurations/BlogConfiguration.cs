using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Persistence.Constants;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ThickTech.BE.Persistence.Configurations;

internal sealed class BlogConfiguration : IEntityTypeConfiguration<Blog>
{
    public void Configure(EntityTypeBuilder<Blog> builder)
    {
        builder.ToTable(TableNames.blogs);

        // Khóa chính
        builder.HasKey(x => x.id);

        // Thuộc tính
        builder.Property(x => x.title)
            .IsRequired()
            .HasMaxLength(255); // Giới hạn độ dài của title nếu cần

        builder.Property(x => x.content)
            .IsRequired();

        builder.Property(x => x.images)
            .HasMaxLength(500); // Giới hạn độ dài của images nếu cần

        builder.Property(x => x.created_date)
            .IsRequired();

        // Thiết lập khóa ngoại đến bảng User
        builder.HasOne(x => x.user)
            .WithMany() // Không có collection Blogs trong User
            .HasForeignKey(x => x.user_id)
            .OnDelete(DeleteBehavior.Cascade); // Xóa blog khi xóa user
    }
}
