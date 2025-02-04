using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Errors;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;

namespace ThickTech.BE.Application;

internal sealed class DeleteProductCommandHandler : BaseDeleteCommandHandler<IProductRepository, Product>
{
    public DeleteProductCommandHandler(IProductRepository productRepository, IUnitOfWork unitOfWork)
        : base(productRepository, unitOfWork)
    {
    }

    protected override Error GetNotFoundError()
    {
        return DomainErrors.Product.NotFound;
    }
}
