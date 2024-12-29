using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Errors;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;
namespace ThickTech.BE.Application;
internal sealed class UpdateOrderCommandHandler : ICommandHandler<UpdateOrderCommand, bool>
{
    private readonly IOrderRepository _orderRepository;
    private readonly IUnitOfWork _unitOfWork;

    public UpdateOrderCommandHandler(
        IOrderRepository orderRepository,
        IUnitOfWork unitOfWork
        )
    {
        _orderRepository = orderRepository;
        _unitOfWork = unitOfWork;
    }
    public async Task<Result<bool>> Handle(UpdateOrderCommand request, CancellationToken cancellationToken)
    {
        var orderExist = await _orderRepository.GetByIdAsync(request.id, cancellationToken);
        if (orderExist is null)
        {
            return Result.Failure<bool>(DomainErrors.Order.NotFound);
        }
        var order = Order.Create(
            request.id,
            request.user_id,
            request.product_id,
            request.price,
            request.quantity,
            request.address,
            request.order_status
         );

        _orderRepository.Update(order);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return true;
    }
}
