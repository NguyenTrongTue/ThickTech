namespace ThickTech.BE.Domain.Primitives;

public interface IAuditableEntity
{
    DateTime created_date { get; set; }

    DateTime? modified_date { get; set; }
}
