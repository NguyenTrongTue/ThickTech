 
namespace ThickTech.BE.Application;
 
public sealed record UpdateClubDetailDTO(
      Guid club_detail_id,
      Guid club_id,
      string name,
      string content,
      string images
);