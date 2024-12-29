using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Application.Responses;
using ThickTech.BE.Domain.Entities;
namespace ThickTech.BE.Application;
public sealed record GetOrderByIdQuery(Guid id) : IQuery<Order>;