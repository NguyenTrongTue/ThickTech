using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.DomainEvents;
using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.Repositories;

namespace ThickTech.BE.Application.Members;

internal sealed class MemberRegisteredDomainEventHandler
     : IDomainEventHandler<UserRegisteredDomainEvent>
{
    private readonly IUserRepository _userRepository;
    private readonly IEmailService _emailService;

    public MemberRegisteredDomainEventHandler(
        IEmailService emailService,
        IUserRepository userRepository)
    {
        _emailService = emailService;
        _userRepository = userRepository;
    }

    public async Task Handle(
        UserRegisteredDomainEvent notification,
        CancellationToken cancellationToken)
    {
        User? member = await _userRepository.GetByIdAsync(
            notification.user_id,
            cancellationToken);

        if (member is null)
        {
            return;
        }

        _emailService.SendWelcomeEmailAsync(member, cancellationToken);
    }
}
