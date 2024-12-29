
using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Application.Responses;
using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Errors;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;
namespace ThickTech.BE.Application;
internal sealed class GetOrderByIdQueryHandler
    : IQueryHandler<GetOrderByIdQuery, Order>
{
    private readonly IOrderRepository _orderRepository;

    public GetOrderByIdQueryHandler(IOrderRepository orderRepository)
    {
        _orderRepository = orderRepository;
    }

    public async Task<Result<Order>> Handle(
        GetOrderByIdQuery request,
        CancellationToken cancellationToken)
    {
        var order = await _orderRepository.GetByIdAsync(request.id, cancellationToken);        
        if (order is null)
        {
            return Result.Failure<Order>(DomainErrors.Order.NotFound);
        }
        return order;
       
    }
}