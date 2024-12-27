using ThickTech.BE.Persistence.Constants;
using ThickTech.BE.Persistence.Outbox;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace ThickTech.BE.Persistence.Configurations;
internal sealed class OutboxMessageConsumerConfiguration : IEntityTypeConfiguration<OutboxMessageConsumer>
{
    public void Configure(EntityTypeBuilder<OutboxMessageConsumer> builder)
    {
        builder.ToTable(TableNames.outbox_message_consumers);
        builder.HasKey(outboxMessageConsumer => new
        {
            outboxMessageConsumer.id,
            outboxMessageConsumer.name
        });
    }
}
