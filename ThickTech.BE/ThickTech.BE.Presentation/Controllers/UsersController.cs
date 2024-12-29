using MediatR;
using Microsoft.AspNetCore.Mvc;
using ThickTech.BE.Application;
using ThickTech.BE.Application.Members.Login;
using ThickTech.BE.Application.Users;
using ThickTech.BE.Domain.Shared;
using ThickTech.BE.Presentation.Abstractions;
using ThickTech.BE.Presentation.Contracts;

namespace ThickTech.BE.Presentation.Controllers;

[Route("api/users")]
public sealed class UsersController : ApiController
{
    public UsersController(ISender sender)
        : base(sender)
    {
    }

    //[HasPermission(Permission.Product)]
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetUserById(Guid id, CancellationToken cancellationToken)
    {
        var query = new GetUserByIdQuery(id);
        Result<UserResponse> response = await Sender.Send(query, cancellationToken);
        return response.IsSuccess ? Ok(response.Value) : NotFound(response.Error);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(
        [FromBody] LoginRequest request,
        CancellationToken cancellationToken)
    {
        var command = new LoginCommand(request.email, request.password);

        Result<string> tokenResult = await Sender.Send(
            command,
            cancellationToken);

        if (tokenResult.IsFailure)
        {
            return HandleFailure(tokenResult);
        }

        return Ok(tokenResult.Value);
    }

    [HttpPost]
    public async Task<IActionResult> RegisterMember(
        [FromBody] RegisterUserRequest request,
        CancellationToken cancellationToken)
    {
        var command = new CreateUserCommand(
            request.email,
            request.userName,
            request.password);

        Result<Guid> result = await Sender.Send(command, cancellationToken);

        if (result.IsFailure)
        {
            return HandleFailure(result);
        }
        return CreatedAtAction(
            nameof(GetUserById),
            new { id = result.Value },
            result.Value);
    }
}
