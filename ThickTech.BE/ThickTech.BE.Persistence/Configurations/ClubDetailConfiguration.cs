using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Persistence.Constants;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ThickTech.BE.Persistence.Configurations;

internal sealed class ClubDetailConfiguration : IEntityTypeConfiguration<ClubDetail>
{
    public void Configure(EntityTypeBuilder<ClubDetail> builder)
    {
        builder.ToTable(TableNames.club_details);

        // Khóa chính
        builder.HasKey(cd => cd.club_detail_id);
        builder.HasOne(cd => cd.club)
               .WithMany(c => c.details)
               .HasForeignKey(cd => cd.master_id)
               .IsRequired();
    }
}