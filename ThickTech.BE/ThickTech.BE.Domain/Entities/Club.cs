using ThickTech.BE.Domain.Primitives;

namespace ThickTech.BE.Domain.Entities;
public sealed class Club: AggregateRoot, IAuditableEntity
{
    private Club(Guid id,
        string _club_name,
        string _club_title,
        string _club_description,
        string _club_goals,
        string _club_images,
        bool _is_active)
        : base(id)
    {
        club_name = _club_name;
        club_title = _club_title;
        club_description = _club_description;
        club_goals = _club_goals;
        club_images = _club_images;
        is_active = _is_active;
    }
    public string club_name { get; private set; }
    public string club_title { get; private set; }
    public string club_description { get; private set; }
    public string club_goals { get; private set; }
    public string club_images { get; private set; }
    public bool is_active { get; set; } 


    public DateTime created_date { get; set; }
    public DateTime? modified_date { get; set; }

    public ICollection<ClubDetail> details { get; set; }
    private Club()
    {
    }
    public static Club Create(
        Guid id,
        string club_name,
        string club_title,
        string club_description,
        string club_goals,
        string club_images)
    {
        var club = new Club(
            id,
            club_name,
            club_title,
            club_description,
            club_goals,
            club_images,
            true
        );
        return club;
    }
}
