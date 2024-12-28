using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Persistence.Constants;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ThickTech.BE.Persistence.Configurations;

internal sealed class RoleConfiguration : IEntityTypeConfiguration<Role>
{
    public void Configure(EntityTypeBuilder<Role> builder)
    {
        builder.ToTable(TableNames.roles);

        builder.HasKey(x => x.id);
    }
}
