namespace ThickTech.BE.Persistence.Outbox;

public sealed class OutboxMessageConsumer
{
    public Guid id { get; set; }

    public string name { get; set; } = string.Empty;
}
