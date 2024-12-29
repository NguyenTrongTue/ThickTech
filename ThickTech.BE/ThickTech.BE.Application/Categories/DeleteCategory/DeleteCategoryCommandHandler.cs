using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Errors;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;
namespace ThickTech.BE.Application;
internal sealed class DeleteCategoryCommandHandler : ICommandHandler<DeleteCategoryCommand, bool>
{
    private readonly ICategoryRepository _categoryRepository;
    private readonly IUnitOfWork _unitOfWork;

    public DeleteCategoryCommandHandler(
        ICategoryRepository categoryRepository,
        IUnitOfWork unitOfWork
        )
    {
        _categoryRepository = categoryRepository;
        _unitOfWork = unitOfWork;
    }
    public async Task<Result<bool>> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
    {
        var categoryExist = await _categoryRepository.GetByIdAsync(request.id, cancellationToken);
        if (categoryExist is null)
        {
            return Result.Failure<bool>(DomainErrors.Category.NotFound);
        }
        _categoryRepository.Delete(request.id);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return true;
    }
}
