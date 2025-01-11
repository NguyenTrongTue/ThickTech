using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;
namespace ThickTech.BE.Application;
internal sealed class CreateCategoryCommandHandler : ICommandHandler<CreateCategoryCommand, bool>
{
    private readonly ICategoryRepository _categoryRepository;
    private readonly IUnitOfWork _unitOfWork;

    public CreateCategoryCommandHandler(
        ICategoryRepository categoryRepository,
        IUnitOfWork unitOfWork
        )
    {
        _categoryRepository = categoryRepository;
        _unitOfWork = unitOfWork;
    }
    public async Task<Result<bool>> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
    {
        var category = Category.Create(
                Guid.NewGuid(),
                request.category_name,
                request.category_slug
            );
        await _categoryRepository.Add(category);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return true;
    }
}
