using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;
namespace ThickTech.BE.Application;
internal sealed class CreateBlogCommandHandler : ICommandHandler<CreateBlogCommand, bool>
{
    private readonly IBlogRepository _blogRepository;
    private readonly IUnitOfWork _unitOfWork;

    public CreateBlogCommandHandler(
        IBlogRepository blogRepository,
        IUnitOfWork unitOfWork
        )
    {
        _blogRepository = blogRepository;
        _unitOfWork = unitOfWork;
    }
    public async Task<Result<bool>> Handle(CreateBlogCommand request, CancellationToken cancellationToken)
    {        
        var blog = Blog.Create(
                Guid.NewGuid(),
                request.user_id,
                request.title,
                request.content,
                request.images
            );
        _blogRepository.Add(blog);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return true;
    }
}
