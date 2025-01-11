using ThickTech.BE.Application;

namespace ThickTech.BE.Presentation.Contracts
{
    public sealed record UpdateClubRequest(
        Guid id,
         string club_name,
        string club_title,
        string club_description,
        string club_goals,
        string club_images,
        ICollection<UpdateClubDetailDTO> club_details
        );

}
