using Microsoft.Extensions.Options;
using MimeKit;
using System;
using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Domain.Entities;
using ThickTech.BE.Domain.ValueObjects;

namespace ThickTech.BE.Infrastructure.Services;

public sealed class EmailService : IEmailService
{
    private readonly EmailOptions _emailOptions;

    public EmailService(IOptions<EmailOptions> emailOptions)
    {
        _emailOptions = emailOptions.Value;
    }

    public void SendWelcomeEmailAsync(User user, CancellationToken cancellationToken = default)
    {
        var emailDto = new EmailDto()
        {
            Subject = "Thông báo tạo tài khoản trên ThickTech thành công!",
            To = user.email.Value,
            Body = $"Thông báo tạo tài khoản trên ThickTech thành công!",
            HTMLBody = $@"<!DOCTYPE html>
<html lang=""en"">
<head>
  <meta charset=""UTF-8"">
  <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
  <title>Stock Notification</title>
</head>
<body style=""margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333;"">

  <table style=""width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; border-collapse: collapse; border: 1px solid #ddd;"">
    <tr>
      <td style=""background-color: #4caf50; color: #fff; text-align: center; padding: 20px;"">
        <h1 style=""margin: 0; font-size: 24px;"">Thông báo</h1>
      </td>
    </tr>
    <tr>
      <td style=""padding: 20px; text-align: center;"">
        <h2 style=""color: #4caf50; margin: 0;"">Thành công!</h2>
        <p style=""font-size: 16px; margin: 10px 0;"">
          Tài khoản của bạn đã được tạo thành công trên <strong>ThickTech</strong>. Chào mừng mừng bạn đến với <strong>ThickTech</strong>!
        </p>
       
        <a href=""http://150.95.113.231/purchase"" style=""display: inline-block; padding: 10px 20px; background-color: #4caf50; color: #fff; text-decoration: none; border-radius: 5px; font-size: 16px;"">
          Đăng nhập ngay
        </a>
      </td>
    </tr>
    <tr>
      <td style=""background-color: #f4f4f4; text-align: center; padding: 10px;"">
        <p style=""font-size: 12px; color: #888; margin: 0;"">
          © 2024 Copyright. Tất cả các quyền được bảo lưu.
        </p>
      </td>
    </tr>
  </table>

</body>
</html>"
        };
        var email = new MimeMessage();
        email.From.Add(MailboxAddress.Parse(_emailOptions.EmailUsername));
        email.To.Add(MailboxAddress.Parse(emailDto.To));
        email.Subject = emailDto.Subject;

        var bodyBuilder = new BodyBuilder();
        bodyBuilder.HtmlBody = emailDto.HTMLBody;

        email.Body = bodyBuilder.ToMessageBody();
        using var smtp = new MailKit.Net.Smtp.SmtpClient();
        smtp.Connect(_emailOptions.EmailHost, 465, true);
        smtp.Authenticate(_emailOptions.EmailUsername, _emailOptions.EmailPassword);
        smtp.Send(email);
        smtp.Disconnect(true);
    }
}
