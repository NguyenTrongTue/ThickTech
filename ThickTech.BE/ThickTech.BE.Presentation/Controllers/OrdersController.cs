using MediatR;
using Microsoft.AspNetCore.Mvc;
using ThickTech.BE.Application;
using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Shared;
using ThickTech.BE.Presentation.Abstractions;
using ThickTech.BE.Presentation.Contracts;

namespace ThickTech.BE.Presentation.Controllers;

[Route("api/order")]
public sealed class OrdersController : ApiController
{
    public OrdersController(ISender sender)
        : base(sender)
    {
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder(
       [FromBody] CreateOrderRequest request,
       CancellationToken cancellationToken)
    {
        var command = new CreateOrderCommand(
                request.user_id,
                request.product_id,
                request.price,
                request.quantity,
                request.address,
                request.order_status
            );
        Result<bool> result = await Sender.Send(command, cancellationToken);
        if (result.IsFailure)
        {
            return HandleFailure(result);
        }
        return CreatedAtAction(
            nameof(CreateOrder),
            new { id = result.Value },
            result.Value);
    }
   
    // [HasPermission(Permission.Product)]
    [HttpGet("get_all_orders")]
    public async Task<IActionResult> GetAllOrders(CancellationToken cancellationToken)
    {
        var query = new GetAllOrdersQuery();
        Result<List<Order>> result = await Sender.Send(query, cancellationToken);
        if (result.IsFailure)
        {
            return HandleFailure(result);
        }
        return CreatedAtAction(
            nameof(GetAllOrders),
            new { id = result.Value },
            result.Value);
    }
    [HttpGet("get_order_by_id")]
    public async Task<IActionResult> GetOrderById(Guid id, CancellationToken cancellationToken)
    {
        var query = new GetOrderByIdQuery(id);
        Result<Order> result = await Sender.Send(query, cancellationToken);
        if (result.IsFailure)
        {
            return HandleFailure(result);
        }
        return CreatedAtAction(
            nameof(GetOrderById),
            new { id = result.Value },
            result.Value);
    }
    // [HasPermission(Permission.Product)]
    [HttpDelete]
    public async Task<IActionResult> DeleteOrderById(Guid id, CancellationToken cancellationToken)
    {
        var command = new DeleteOrderCommand(id);
        Result<bool> result = await Sender.Send(command, cancellationToken);
        if (result.IsFailure)
        {
            return HandleFailure(result);
        }
        return CreatedAtAction(
            nameof(DeleteOrderById),
            new { id = result.Value },
            result.Value);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateOrderById([FromBody] UpdateOrderRequest request, CancellationToken cancellationToken)
    {
        var command = new UpdateOrderCommand(
            request.id,
            request.user_id,
            request.product_id,
            request.price,
            request.quantity,
            request.address,
            request.order_status      
            );
        Result<bool> result = await Sender.Send(command, cancellationToken);
        if (result.IsFailure)
        {
            return HandleFailure(result);
        }
        return CreatedAtAction(
            nameof(UpdateOrderById),
            new { id = result.Value },
            result.Value);
    }

}
