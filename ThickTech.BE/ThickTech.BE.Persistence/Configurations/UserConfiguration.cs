using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.ValueObjects;
using ThickTech.BE.Persistence.Constants;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ThickTech.BE.Persistence.Configurations;

internal sealed class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable(TableNames.users);
        builder.HasKey(x => x.id);

        builder
            .Property(x => x.email)
            .HasConversion(x => x.Value, v => Email.Create(v).Value);
        builder
            .Property(x => x.user_name)
            .HasConversion(x => x.Value, v => UserName.Create(v).Value)
            .HasMaxLength(UserName.MaxLength);

        builder.HasIndex(x => x.email).IsUnique();
    }
}
