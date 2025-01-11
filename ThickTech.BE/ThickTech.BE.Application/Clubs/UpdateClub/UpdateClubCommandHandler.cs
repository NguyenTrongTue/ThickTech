using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Errors;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;
namespace ThickTech.BE.Application;
internal sealed class UpdateClubCommandHandler : ICommandHandler<UpdateClubCommand, bool>
{
    private readonly IClubRepository _clubRepository;
    private readonly IUnitOfWork _unitOfWork;

    public UpdateClubCommandHandler(
        IClubRepository clubRepository,
        IUnitOfWork unitOfWork
        )
    {
        _clubRepository = clubRepository;
        _unitOfWork = unitOfWork;
    }
    public async Task<Result<bool>> Handle(UpdateClubCommand request, CancellationToken cancellationToken)
    {
        var clubExist = await _clubRepository.GetByIdAsync(request.id, cancellationToken);
        if (clubExist is null)
        {
            return Result.Failure<bool>(DomainErrors.Club.NotFound);
        }
        var club = Club.Create(
            request.id,
           request.club_name,
                request.club_title,
                request.club_description,
                request.club_goals,
                request.club_images
         );

        var obj = new Request<Club, ClubDetail>()
        {
            Master = club,
            Details = request.club_details.Select(x => new ClubDetail()
            {
                club_detail_id = x.club_detail_id,
                master_id = club.id,
                name = x.name,
                content = x.content,
                images = x.images
            }).ToList()
        };
        _clubRepository.Update(obj);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return true;
    }
}
