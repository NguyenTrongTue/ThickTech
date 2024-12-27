using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Entities;

namespace ThickTech.BE.Infrastructure.Services;

public sealed class EmailService : IEmailService
{
    public Task SendWelcomeEmailAsync(User user, CancellationToken cancellationToken = default) =>
        Task.CompletedTask;
}
