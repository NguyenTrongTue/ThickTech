using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Errors;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;
namespace ThickTech.BE.Application;
internal sealed class UpdateBlogCommandHandler : ICommandHandler<UpdateBlogCommand, bool>
{
    private readonly IBlogRepository _blogRepository;
    private readonly IUnitOfWork _unitOfWork;

    public UpdateBlogCommandHandler(
        IBlogRepository blogRepository,
        IUnitOfWork unitOfWork
        )
    {
        _blogRepository = blogRepository;
        _unitOfWork = unitOfWork;
    }
    public async Task<Result<bool>> Handle(UpdateBlogCommand request, CancellationToken cancellationToken)
    {
        var blogExist = await _blogRepository.GetByIdAsync(request.id, cancellationToken);
        if (blogExist is null)
        {
            return Result.Failure<bool>(DomainErrors.Blog.NotFound);
        }
        var blog = Blog.Create(
            request.id,
            request.user_id,
            request.title,
            request.content,
            request.images 
         );

        _blogRepository.Update(blog);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return true;
    }
}
