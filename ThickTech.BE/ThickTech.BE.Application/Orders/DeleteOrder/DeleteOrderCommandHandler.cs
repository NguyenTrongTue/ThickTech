using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Errors;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;
namespace ThickTech.BE.Application;
internal sealed class DeleteOrderCommandHandler : ICommandHandler<DeleteOrderCommand, bool>
{
    private readonly IOrderRepository _orderRepository;
    private readonly IUnitOfWork _unitOfWork;

    public DeleteOrderCommandHandler(
        IOrderRepository orderRepository,
        IUnitOfWork unitOfWork
        )
    {
        _orderRepository = orderRepository;
        _unitOfWork = unitOfWork;
    }
    public async Task<Result<bool>> Handle(DeleteOrderCommand request, CancellationToken cancellationToken)
    {
        var orderExist = await _orderRepository.GetByIdAsync(request.id, cancellationToken);
        if (orderExist is null)
        {
            return Result.Failure<bool>(DomainErrors.Order.NotFound);
        }
        _orderRepository.Delete(request.id);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return true;
    }
}
