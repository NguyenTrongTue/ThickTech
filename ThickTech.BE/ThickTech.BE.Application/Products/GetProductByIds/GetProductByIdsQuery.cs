using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Application.Responses;
namespace ThickTech.BE.Application;
public sealed record GetProductByIdsQuery(List<Guid> ids) : IQuery<List<ProductResponse>>;