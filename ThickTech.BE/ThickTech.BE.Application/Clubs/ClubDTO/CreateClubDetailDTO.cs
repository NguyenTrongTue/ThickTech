 
namespace ThickTech.BE.Application;
 
 public sealed record CreateClubDetailDTO(
        Guid club_id,
        string name,
        string content,
        string images
);