using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;
namespace ThickTech.BE.Application;
internal sealed class CreateOrderCommandHandler : ICommandHandler<CreateOrderCommand, bool>
{
    private readonly IOrderRepository _orderRepository;
    private readonly IUnitOfWork _unitOfWork;

    public CreateOrderCommandHandler(
        IOrderRepository orderRepository,
        IUnitOfWork unitOfWork
        )
    {
        _orderRepository = orderRepository;
        _unitOfWork = unitOfWork;
    }
    public async Task<Result<bool>> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
    {        
        var order = Order.Create(
                Guid.NewGuid(),
                request.user_id,
                request.product_id,
                request.price,
                request.quantity,
                request.address,
                request.order_status
            );
        await _orderRepository.Add(order);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return true;
    }
}
