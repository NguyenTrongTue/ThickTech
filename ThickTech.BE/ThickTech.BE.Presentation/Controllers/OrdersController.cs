using MediatR;
using Microsoft.AspNetCore.Mvc;
using ThickTech.BE.Presentation.Abstractions;

namespace ThickTech.BE.Presentation.Controllers;

[Route("api/order")]
public sealed class OrdersController : ApiController
{
    public OrdersController(ISender sender)
        : base(sender)
    {
    }

  
}
