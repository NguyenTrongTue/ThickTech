using MediatR;
using Microsoft.AspNetCore.Mvc;
using ThickTech.BE.Presentation.Abstractions;

namespace ThickTech.BE.Presentation.Controllers;

[Route("api/product")]
public sealed class ProductsController : ApiController
{
    public ProductsController(ISender sender)
        : base(sender)
    {

    }

  
}
