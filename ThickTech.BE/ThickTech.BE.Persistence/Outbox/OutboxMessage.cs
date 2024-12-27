namespace ThickTech.BE.Persistence.Outbox;

public sealed class OutboxMessage
{
    public Guid id { get; set; }

    public string type { get; set; } = string.Empty;

    public string content { get; set; } = string.Empty;

    public DateTime occurred_on_utc { get; set; }

    public DateTime? processed_on_utc { get; set; }

    public string? error { get; set; }
}
