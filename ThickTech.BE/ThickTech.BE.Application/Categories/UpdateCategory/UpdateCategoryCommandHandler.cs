using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Errors;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;
namespace ThickTech.BE.Application;
internal sealed class UpdateCategoryCommandHandler : ICommandHandler<UpdateCategoryCommand, bool>
{
    private readonly ICategoryRepository _categoryRepository;
    private readonly IUnitOfWork _unitOfWork;

    public UpdateCategoryCommandHandler(
        ICategoryRepository categoryRepository,
        IUnitOfWork unitOfWork
        )
    {
        _categoryRepository = categoryRepository;
        _unitOfWork = unitOfWork;
    }
    public async Task<Result<bool>> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
    {
        var categoryExist = await _categoryRepository.GetByIdAsync(request.id, cancellationToken);
        if (categoryExist is null)
        {
            return Result.Failure<bool>(DomainErrors.Category.NotFound);
        }
        var category = Category.Create(
            request.id,
            request.category_name,
            request.category_slug
         );

        _categoryRepository.Update(category);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return true;
    }
}
