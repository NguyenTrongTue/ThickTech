using System.Xml.Linq;
using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;
namespace ThickTech.BE.Application;
internal sealed class CreateClubCommandHandler : ICommandHandler<CreateClubCommand, bool>
{
    private readonly IClubRepository _clubRepository;
    private readonly IUnitOfWork _unitOfWork;

    public CreateClubCommandHandler(
        IClubRepository clubRepository,
        IUnitOfWork unitOfWork
        )
    {
        _clubRepository = clubRepository;
        _unitOfWork = unitOfWork;
    }
    public async Task<Result<bool>> Handle(CreateClubCommand request, CancellationToken cancellationToken)
    {
        var masterId = Guid.NewGuid();
        var club = Club.Create(
                masterId,
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
                club_detail_id = Guid.NewGuid(),
                master_id = masterId,
                name = x.name,
                content = x.content,
                images = x.images
            }).ToList()
        };
        await _clubRepository.Add(obj);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return true;
    }
}
