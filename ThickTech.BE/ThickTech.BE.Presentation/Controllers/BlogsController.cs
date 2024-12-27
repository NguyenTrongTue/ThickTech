using MediatR;
using Microsoft.AspNetCore.Mvc;
using ThickTech.BE.Presentation.Abstractions;

namespace ThickTech.BE.Presentation.Controllers;

[Route("api/blog")]
public sealed class BlogsController : ApiController
{
    public BlogsController(ISender sender)
        : base(sender)
    {

    }

  
}
