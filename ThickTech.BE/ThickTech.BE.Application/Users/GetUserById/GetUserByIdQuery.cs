using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Application.Users;

namespace ThickTech.BE.Application.Users;
public sealed record GetUserByIdQuery(Guid userId) : IQuery<UserResponse>;