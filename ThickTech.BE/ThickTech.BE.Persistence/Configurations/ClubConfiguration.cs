using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Persistence.Constants;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ThickTech.BE.Persistence.Configurations;

internal sealed class ClubConfiguration : IEntityTypeConfiguration<Club>
{
    public void Configure(EntityTypeBuilder<Club> builder)
    {
        builder.ToTable(TableNames.clubs);

        builder.HasKey(x => x.id);
    }
}
