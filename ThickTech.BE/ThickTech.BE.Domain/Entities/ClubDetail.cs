using System.Text.Json.Serialization;

namespace ThickTech.BE.Domain.Entities;

public sealed class ClubDetail
{
    public Guid master_id { get; set; }
    public Guid club_detail_id { get; set; }
    public string name { get; set; }
    public string content { get; set; }
    public string images { get; set; }
    [JsonIgnore]
    public Club club { get; set; }
}
