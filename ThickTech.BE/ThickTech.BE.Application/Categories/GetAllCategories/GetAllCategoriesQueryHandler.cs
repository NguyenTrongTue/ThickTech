
using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;

namespace ThickTech.BE.Application.Products;

internal sealed class GetAllCategoriesQueryQueryHandler
    : IQueryHandler<GetAllCategoriesQuery, List<Category>>
{
    private readonly ICategoryRepository _categoryRepository;

    public GetAllCategoriesQueryQueryHandler(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<Result<List<Category>>> Handle(
        GetAllCategoriesQuery request,
        CancellationToken cancellationToken)
    {
        var categories = await _categoryRepository.GetAlls(cancellationToken);        
        return categories;
       
    }
}