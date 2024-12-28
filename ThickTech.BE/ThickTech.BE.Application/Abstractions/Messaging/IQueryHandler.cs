using ThickTech.BE.Domain.Shared;
using MediatR;

namespace ThickTech.BE.Application.Abstractions;

public interface IQueryHandler<TQuery, TResponse>
    : IRequestHandler<TQuery, Result<TResponse>>
    where TQuery : IQuery<TResponse>
{
}