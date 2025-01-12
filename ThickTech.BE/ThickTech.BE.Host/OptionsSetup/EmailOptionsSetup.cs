using Microsoft.Extensions.Options;
using ThickTech.BE.Infrastructure;

namespace ThickTech.BE.Host.OptionsSetup;

public class EmailOptionsSetup : IConfigureOptions<EmailOptions>
{
    private const string SectionName = "Email";
    private readonly IConfiguration _configuration;

    public EmailOptionsSetup(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public void Configure(EmailOptions options)
    {
        _configuration.GetSection(SectionName).Bind(options);
    }
}
