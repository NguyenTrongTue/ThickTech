﻿using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Entities;
namespace ThickTech.BE.Application;
public sealed record GetAllOrdersQuery() : IQuery<List<Order>>;