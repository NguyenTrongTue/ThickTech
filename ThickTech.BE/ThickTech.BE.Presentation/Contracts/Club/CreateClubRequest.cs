using ThickTech.BE.Application;
namespace ThickTech.BE.Presentation.Contracts
{
    public sealed record CreateClubRequest(
        string club_name,
        string club_title,
        string club_description,
        string club_goals,
        string club_images,
        ICollection<CreateClubDetailDTO> club_details
    );
}
