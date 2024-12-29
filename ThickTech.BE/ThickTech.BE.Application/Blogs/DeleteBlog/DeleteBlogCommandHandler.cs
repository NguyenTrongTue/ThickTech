using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Errors;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;
namespace ThickTech.BE.Application;
internal sealed class DeleteBlogCommandHandler : ICommandHandler<DeleteBlogCommand, bool>
{
    private readonly IBlogRepository _blogRepository;
    private readonly IUnitOfWork _unitOfWork;

    public DeleteBlogCommandHandler(
        IBlogRepository blogRepository,
        IUnitOfWork unitOfWork
        )
    {
        _blogRepository = blogRepository;
        _unitOfWork = unitOfWork;
    }
    public async Task<Result<bool>> Handle(DeleteBlogCommand request, CancellationToken cancellationToken)
    {
        var blogExist = await _blogRepository.GetByIdAsync(request.id, cancellationToken);
        if (blogExist is null)
        {
            return Result.Failure<bool>(DomainErrors.Blog.NotFound);
        }
        _blogRepository.Delete(request.id);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return true;
    }
}
