using ThickTech.BE.Application.Abstractions;

namespace ThickTech.BE.Application;
public sealed record BaseDeleteCommand(Guid id) : ICommand<bool>;