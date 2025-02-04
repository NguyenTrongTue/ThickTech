using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Repositories; 
namespace ThickTech.BE.Application.Products;

internal sealed class GetAllBlogsQueryQueryHandler
    : BaseGetAllHandler<IBlogRepository, Blog>
{
    public GetAllBlogsQueryQueryHandler(IBlogRepository blogRepository)
       : base(blogRepository)
    {
    }
}