using MediatR;
using ThickTech.BE.Domain.Shared;
namespace ThickTech.BE.Application.Abstractions;
public interface ICommand : IRequest<Result>
{
}
public interface ICommand<TResponse> : IRequest<Result<TResponse>>
{
}
