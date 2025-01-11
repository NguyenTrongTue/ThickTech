
using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;

namespace ThickTech.BE.Application.Products;

internal sealed class GetAllClubsQueryQueryHandler
    : IQueryHandler<GetAllClubsQuery, List<Club>>
{
    private readonly IClubRepository _clubRepository;

    public GetAllClubsQueryQueryHandler(IClubRepository clubRepository)
    {
        _clubRepository = clubRepository;
    }


    public async Task<Result<List<Club>>> Handle(
        GetAllClubsQuery request,
        CancellationToken cancellationToken)
    {
        var clubs = await _clubRepository.GetAlls(cancellationToken);        
        return clubs;
       
    }
}