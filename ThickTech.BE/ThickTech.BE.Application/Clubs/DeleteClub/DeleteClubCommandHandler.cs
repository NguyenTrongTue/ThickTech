using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Errors;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;
namespace ThickTech.BE.Application;
internal sealed class DeleteClubCommandHandler : ICommandHandler<DeleteClubCommand, bool>
{
    private readonly IClubRepository _clubRepository;
    private readonly IUnitOfWork _unitOfWork;

    public DeleteClubCommandHandler(
        IClubRepository clubRepository,
        IUnitOfWork unitOfWork
        )
    {
        _clubRepository = clubRepository;
        _unitOfWork = unitOfWork;
    }
    public async Task<Result<bool>> Handle(DeleteClubCommand request, CancellationToken cancellationToken)
    {
        var clubExist = await _clubRepository.GetByIdAsync(request.id, cancellationToken);
        if (clubExist is null)
        {
            return Result.Failure<bool>(DomainErrors.Club.NotFound);
        }
        _clubRepository.Delete(request.id);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return true;
    }
}
