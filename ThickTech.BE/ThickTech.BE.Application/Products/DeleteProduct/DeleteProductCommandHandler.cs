using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Errors;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;
namespace ThickTech.BE.Application;
internal sealed class DeleteProductCommandHandler : ICommandHandler<DeleteProductCommand, bool>
{
    private readonly IProductRepository _productRepository;
    private readonly IUnitOfWork _unitOfWork;

    public DeleteProductCommandHandler(
        IProductRepository productRepository,
        IUnitOfWork unitOfWork
        )
    {
        _productRepository = productRepository;
        _unitOfWork = unitOfWork;
    }
    public async Task<Result<bool>> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
    {
        var productExist = await _productRepository.GetByIdAsync(request.id, cancellationToken);
        if (productExist is null)
        {
            return Result.Failure<bool>(DomainErrors.Product.NotFound);
        }
        _productRepository.Delete(request.id);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return true;
    }
}
