using MediatR;
using Microsoft.AspNetCore.Mvc;
using ThickTech.BE.Application;
using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Shared;
using ThickTech.BE.Presentation.Abstractions;
using ThickTech.BE.Presentation.Contracts;

namespace ThickTech.BE.Presentation.Controllers;

[Route(template: "api/club")]
public sealed class ClubsController : ApiController
{
    public ClubsController(ISender sender)
        : base(sender)
    {
    }
    //[HasPermission(Permission.Product)]
    [HttpPost]
    public async Task<IActionResult> CreateClub(
       [FromBody] CreateClubRequest request,
       CancellationToken cancellationToken)
    {
        var command = new CreateClubCommand(
                request.club_name,
                request.club_title,
                request.club_description,
                request.club_goals,
                request.club_images,
                request.club_details
            );
        Result<bool> result = await Sender.Send(command, cancellationToken);
        if (result.IsFailure)
        {
            return HandleFailure(result);
        }
        return CreatedAtAction(
            nameof(CreateClub),
            new { id = result.Value },
            result.Value);
    }

    // [HasPermission(Permission.Product)]
    [HttpGet("get_all_clubs")]
    public async Task<IActionResult> GetAllClubs(CancellationToken cancellationToken)
    {
        var query = new GetAllClubsQuery();
        Result<List<Club>> result = await Sender.Send(query, cancellationToken);
        if (result.IsFailure)
        {
            return HandleFailure(result);
        }
        return CreatedAtAction(
            nameof(GetAllClubs),
            new { id = result.Value },
            result.Value);
    }
    [HttpGet("get_club_by_id")]
    public async Task<IActionResult> GetClubById(Guid id, CancellationToken cancellationToken)
    {
        var query = new GetClubByIdQuery(id);
        Result<Club> result = await Sender.Send(query, cancellationToken);
        if (result.IsFailure)
        {
            return HandleFailure(result);
        }
        return CreatedAtAction(
            nameof(GetClubById),
            new { id = result.Value },
            result.Value);
    }
    // [HasPermission(Permission.Product)]
    [HttpDelete]
    public async Task<IActionResult> DeleteClubById(Guid id, CancellationToken cancellationToken)
    {
        var command = new DeleteClubCommand(id);
        Result<bool> result = await Sender.Send(command, cancellationToken);
        if (result.IsFailure)
        {
            return HandleFailure(result);
        }
        return CreatedAtAction(
            nameof(DeleteClubById),
            new { id = result.Value },
            result.Value);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateClubById([FromBody] UpdateClubRequest request, CancellationToken cancellationToken)
    {
        var command = new UpdateClubCommand(
            request.id,
            request.club_name,
                request.club_title,
                request.club_description,
                request.club_goals,
                request.club_images,
                request.club_details
            );
        Result<bool> result = await Sender.Send(command, cancellationToken);
        if (result.IsFailure)
        {
            return HandleFailure(result);
        }
        return CreatedAtAction(
            nameof(UpdateClubById),
            new { id = result.Value },
            result.Value);
    }

}
