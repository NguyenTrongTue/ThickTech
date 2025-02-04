using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Errors;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Repositories.Base;
using ThickTech.BE.Domain.Shared;

namespace ThickTech.BE.Application;

internal abstract class BaseDeleteCommandHandler<TRepository, TEntity> : ICommandHandler<BaseDeleteCommand, bool>
    where TRepository : IBaseRepository<TEntity>
{
    private readonly TRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    protected BaseDeleteCommandHandler(TRepository repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<bool>> Handle(BaseDeleteCommand request, CancellationToken cancellationToken)
    {
        // Kiểm tra entity có tồn tại hay không
        var entityExist = await _repository.GetByIdAsync(request.id, cancellationToken);
        if (entityExist is null)
        {
            return Result.Failure<bool>(GetNotFoundError());
        }

        // Xóa entity
        _repository.Delete(request.id);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return true;
    }

    // Abstract method để lấy lỗi "Not Found" tương ứng
    protected abstract Error GetNotFoundError();
}
