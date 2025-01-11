using ThickTech.BE.Application.Abstractions;
namespace ThickTech.BE.Application;

public sealed record CreateClubCommand(
        string club_name,
        string club_title,
        string club_description,
        string club_goals,
        string club_images,
        ICollection <CreateClubDetailDTO> club_details) : ICommand<bool>;
