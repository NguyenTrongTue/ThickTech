using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Errors;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;
namespace ThickTech.BE.Application;
internal sealed class GetClubByIdQueryHandler
    : IQueryHandler<GetClubByIdQuery, Club>
{
    private readonly IClubRepository _clubRepository;

    public GetClubByIdQueryHandler(IClubRepository clubRepository)
    {
        _clubRepository = clubRepository;
    }

    public async Task<Result<Club>> Handle(
        GetClubByIdQuery request,
        CancellationToken cancellationToken)
    {
        var club = await _clubRepository.GetByIdAsync(request.id, cancellationToken);        
        if (club is null)
        {
            return Result.Failure<Club>(DomainErrors.Club.NotFound);
        }
        return club;
       
    }
}