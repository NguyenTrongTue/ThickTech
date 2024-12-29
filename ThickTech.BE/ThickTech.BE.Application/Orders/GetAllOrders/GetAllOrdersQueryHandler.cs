
using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;

namespace ThickTech.BE.Application.Products;

internal sealed class GetAllOrdersQueryQueryHandler
    : IQueryHandler<GetAllOrdersQuery, List<Order>>
{
    private readonly IOrderRepository _orderRepository;

    public GetAllOrdersQueryQueryHandler(IOrderRepository orderRepository)
    {
        _orderRepository = orderRepository;
    }

    public async Task<Result<List<Order>>> Handle(
        GetAllOrdersQuery request,
        CancellationToken cancellationToken)
    {
        var orders = await _orderRepository.GetAlls(cancellationToken);        
        return orders;
       
    }
}