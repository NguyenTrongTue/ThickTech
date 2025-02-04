using ThickTech.BE.Application.Abstractions;
namespace ThickTech.BE.Application;
public sealed record BaseGetAllQuery<TEntity>() : IQuery<List<TEntity>>;