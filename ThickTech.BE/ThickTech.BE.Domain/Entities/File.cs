namespace ThickTech.BE.Domain.Entities;

public class FileEntity
{
    public Guid file_id { get; set; }

    public string file_name { get; set; }

    public int file_type { get; set; }

    public bool is_temp { get; set; }

    public DateTime created_at { get; set; }
}

