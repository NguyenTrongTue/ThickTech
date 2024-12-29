
using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Errors;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;
namespace ThickTech.BE.Application;
internal sealed class GetBlogByIdQueryHandler
    : IQueryHandler<GetBlogByIdQuery, Blog>
{
    private readonly IBlogRepository _blogRepository;

    public GetBlogByIdQueryHandler(IBlogRepository blogRepository)
    {
        _blogRepository = blogRepository;
    }

    public async Task<Result<Blog>> Handle(
        GetBlogByIdQuery request,
        CancellationToken cancellationToken)
    {
        var blog = await _blogRepository.GetByIdAsync(request.id, cancellationToken);        
        if (blog is null)
        {
            return Result.Failure<Blog>(DomainErrors.Blog.NotFound);
        }
        return blog;
       
    }
}