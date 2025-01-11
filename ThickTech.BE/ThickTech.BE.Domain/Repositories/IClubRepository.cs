using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Repositories.Base;
namespace ThickTech.BE.Domain.Repositories;
public interface IClubRepository : IBaseMasterDetailRepository<Club, ClubDetail>
{
    
}
