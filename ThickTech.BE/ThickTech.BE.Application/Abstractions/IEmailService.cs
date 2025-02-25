﻿using ThickTech.BE.Domain.Entities;
namespace ThickTech.BE.Application.Abstractions;

public interface IEmailService
{
    void SendWelcomeEmailAsync(User user, CancellationToken cancellationToken = default);
}
