
using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;

namespace ThickTech.BE.Application.Products;

internal sealed class GetAllBlogsQueryQueryHandler
    : IQueryHandler<GetAllBlogsQuery, List<Blog>>
{
    private readonly IBlogRepository _blogRepository;

    public GetAllBlogsQueryQueryHandler(IBlogRepository blogRepository)
    {
        _blogRepository = blogRepository;
    }

    public async Task<Result<List<Blog>>> Handle(
        GetAllBlogsQuery request,
        CancellationToken cancellationToken)
    {
        var blogs = await _blogRepository.GetAlls(cancellationToken);        
        return blogs;
       
    }
}