using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Errors;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;

namespace ThickTech.BE.Application;

internal sealed class DeleteCategoryCommandHandler : BaseDeleteCommandHandler<ICategoryRepository, Category>
{
    public DeleteCategoryCommandHandler(ICategoryRepository categoryRepository, IUnitOfWork unitOfWork)
        : base(categoryRepository, unitOfWork)
    {
    }

    protected override Error GetNotFoundError()
    {
        return DomainErrors.Category.NotFound;
    }
}
