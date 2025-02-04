
using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Repositories.Base;
using ThickTech.BE.Domain.Shared;

namespace ThickTech.BE.Application.Products;

internal abstract class BaseGetAllHandler<TRepository, TEntity> : IQueryHandler<BaseGetAllQuery<TEntity>, List<TEntity>>
    where TRepository : IBaseRepository<TEntity>
{
    private readonly TRepository _repository;

    public BaseGetAllHandler(TRepository repository)
    {
        _repository = repository;
    }
    public async Task<Result<List<TEntity>>> Handle(
        BaseGetAllQuery<TEntity> request,
        CancellationToken cancellationToken)
    {
        var entities = await _repository.GetAlls(cancellationToken);
        return entities;
    }
}