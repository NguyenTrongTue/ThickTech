using ThickTech.BE.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ThickTech.BE.Persistence.Constants;
namespace ThickTech.BE.Persistence.Configurations;
internal sealed class RoleUserConfiguration
    : IEntityTypeConfiguration<RoleUser>
{
    public void Configure(EntityTypeBuilder<RoleUser> builder)
    {
        builder.ToTable(TableNames.role_user);
        builder.HasKey(x => new { x.role_id, x.user_id });


        // Khóa ngoại đến bảng Role
        builder.HasOne(x => x.role)
            .WithMany(x => x.role_users)
            .HasForeignKey(x => x.role_id)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();

        // Khóa ngoại đến bảng User
        builder.HasOne(x => x.user)
            .WithMany()
            .HasForeignKey(x => x.user_id)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();   
}
}
