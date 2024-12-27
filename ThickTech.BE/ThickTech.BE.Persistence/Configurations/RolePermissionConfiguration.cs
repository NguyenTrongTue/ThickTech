using ThickTech.BE.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ThickTech.BE.Persistence.Constants;
namespace ThickTech.BE.Persistence.Configurations;
internal sealed class RolePermissionConfiguration
    : IEntityTypeConfiguration<RolePermission>
{
    public void Configure(EntityTypeBuilder<RolePermission> builder)
    {
        builder.ToTable(TableNames.role_permission);
        builder.HasKey(x => new { x.role_id, x.permission_id });

        // Khóa ngoại đến bảng Role
        // Khóa ngoại đến bảng Role
        builder.HasOne(x => x.role)
            .WithMany(x => x.role_permissions)
            .HasForeignKey(x => x.role_id)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();

        // Khóa ngoại đến bảng Permission
        builder.HasOne(x => x.permission)
            .WithMany(x => x.role_permissions) // Chỉ định rõ điều hướng
            .HasForeignKey(x => x.permission_id)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();
    }
}
