using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using ThickTech.BE.Persistence.Repositories.Base;
namespace ThickTech.BE.Persistence.Repositories;
public sealed class ClubRepository : BaseMasterDetailRepository<Club, ClubDetail>, IClubRepository
{
    private readonly ApplicationDbContext _dbContext;
    private readonly DbSet<Club> _clubs;
    private readonly DbSet<ClubDetail> _club_details;

    public ClubRepository(ApplicationDbContext dbContext) : base(dbContext)
    {
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        _clubs = _dbContext.Set<Club>();
        _club_details = _dbContext.Set<ClubDetail>();
    }   
}
