using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Application.Responses;
namespace ThickTech.BE.Application;
public sealed record GetProductByIdQuery(Guid id) : IQuery<ProductResponse>;