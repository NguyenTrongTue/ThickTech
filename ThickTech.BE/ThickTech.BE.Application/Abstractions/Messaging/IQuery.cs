using ThickTech.BE.Domain.Shared;
using MediatR;

namespace ThickTech.BE.Application.Abstractions;

public interface IQuery<TResponse> : IRequest<Result<TResponse>>
{
}