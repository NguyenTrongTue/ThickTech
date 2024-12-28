
using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Application.Users;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Domain.Shared;

namespace ThickTech.BE.Application.Users;

internal sealed class GetUserByIdQueryHandler
    : IQueryHandler<GetUserByIdQuery, UserResponse>
{
    private readonly IUserRepository _userRepository;

    public GetUserByIdQueryHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<Result<UserResponse>> Handle(
        GetUserByIdQuery request,
        CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByIdAsync(
            request.userId,
            cancellationToken);

        if (user is null)
        {
            return Result.Failure<UserResponse>(new Error(
                "User.NotFound",
                $"The user with Id {request.userId} was not found"));
        }

        var response = new UserResponse(user.id, user.email.Value);

        return response;
    }
}