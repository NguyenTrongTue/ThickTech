using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Errors;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;

namespace ThickTech.BE.Application;

internal sealed class DeleteOrderCommandHandler : BaseDeleteCommandHandler<IOrderRepository, Order>
{
    public DeleteOrderCommandHandler(IOrderRepository orderRepository, IUnitOfWork unitOfWork)
        : base(orderRepository, unitOfWork)
    {
    }

    protected override Error GetNotFoundError()
    {
        return DomainErrors.Order.NotFound;
    }
}
