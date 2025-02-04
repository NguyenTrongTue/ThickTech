using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Errors;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;

namespace ThickTech.BE.Application;

internal sealed class DeleteBlogCommandHandler : BaseDeleteCommandHandler<IBlogRepository, Blog>
{
    public DeleteBlogCommandHandler(IBlogRepository blogRepository, IUnitOfWork unitOfWork)
        : base(blogRepository, unitOfWork)
    {
    }
    protected override Error GetNotFoundError()
    {
        return DomainErrors.Blog.NotFound;
    }
}
