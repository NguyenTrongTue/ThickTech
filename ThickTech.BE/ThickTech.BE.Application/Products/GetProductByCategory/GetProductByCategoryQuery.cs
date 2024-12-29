using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Application.Responses;
namespace ThickTech.BE.Application;
public sealed record GetProductByCategoryQuery(Guid productCategory) : IQuery<List<ProductResponse>>;