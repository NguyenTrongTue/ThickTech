using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Persistence.Constants;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ThickTech.BE.Persistence.Configurations;

internal sealed class FileConfiguration : IEntityTypeConfiguration<FileEntity>
{
    public void Configure(EntityTypeBuilder<FileEntity> builder)
    {
        builder.ToTable(TableNames.files);

        builder.HasKey(x => x.file_id);
    }
}
