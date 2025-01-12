using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Quartz;
using Scrutor;
using ThickTech.BE.Application.Abstractions;
using ThickTech.BE.Application.Behaviors;
using ThickTech.BE.Domain.Repositories;
using ThickTech.BE.Host.OptionsSetup;
using ThickTech.BE.Infrastructure.Authentication;
using ThickTech.BE.Infrastructure.BackgroundJobs;
using ThickTech.BE.Infrastructure.Services;
using ThickTech.BE.Persistence;
using ThickTech.BE.Persistence.Interceptors;
using ThickTech.BE.Persistence.Repositories;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IBlogRepository, BlogRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IFileRepository, FileRepository>();
builder.Services.AddScoped<IJwtProvider, JwtProvider>();
builder.Services.AddScoped<IPermissionService, PermissionService>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IFileService, FileService>();
builder.Services.AddStackExchangeRedisCache(redisOptions =>
{
    string connection = builder.Configuration
        .GetConnectionString("Redis")!;
    redisOptions.Configuration = connection;
});
builder
    .Services
    .Scan(
        selector => selector
            .FromAssemblies(
                ThickTech.BE.Infrastructure.AssemblyReference.Assembly,
                ThickTech.BE.Persistence.AssemblyReference.Assembly)
            .AddClasses(false)
            .UsingRegistrationStrategy(RegistrationStrategy.Skip)
            .AsMatchingInterface()
            .WithScopedLifetime());
builder.Services.AddMemoryCache();
builder.Services.AddMediatR(ThickTech.BE.Application.AssemblyReference.Assembly);
builder.Services.AddScoped(typeof(IPipelineBehavior<,>), typeof(ValidationPipelineBehavior<,>));

builder.Services.AddValidatorsFromAssembly(
    ThickTech.BE.Application.AssemblyReference.Assembly,
    includeInternalTypes: true);

string connectionString = builder.Configuration.GetConnectionString("Database")!;
builder.Services.AddSingleton<ConvertDomainEventsToOutboxMessagesInterceptor>();
builder.Services.AddSingleton<UpdateAuditableEntitiesInterceptor>();
builder.Services.AddDbContext<ApplicationDbContext>(
    (sp, optionsBuilder) =>
    {
        optionsBuilder.UseNpgsql(connectionString);
    });
builder.Services.AddScoped<IJob, ProcessOutboxMessagesJob>();
builder.Services.AddQuartz(configure =>
{
    var jobKey = new JobKey(nameof(ProcessOutboxMessagesJob));
    configure
        .AddJob<ProcessOutboxMessagesJob>(jobKey)
        .AddTrigger(
            trigger =>
                trigger.ForJob(jobKey)
                    .WithSimpleSchedule(
                        schedule =>
                            schedule.WithIntervalInSeconds(100)
                                .RepeatForever()));
    configure.UseMicrosoftDependencyInjectionJobFactory();
});
builder.Services.AddQuartzHostedService();
builder
    .Services
    .AddControllers()
    .AddApplicationPart(ThickTech.BE.Presentation.AssemblyReference.Assembly);

builder.Services.AddSwaggerGen();
builder.Services.ConfigureOptions<JwtOptionsSetup>();
builder.Services.ConfigureOptions<JwtBearerOptionsSetup>();
builder.Services.ConfigureOptions<EmailOptionsSetup>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer();

builder.Services.AddAuthorization();
builder.Services.AddSingleton<IAuthorizationHandler, PermissionAuthorizationHandler>();
builder.Services.AddSingleton<IAuthorizationPolicyProvider, PermissionAuthorizationPolicyProvider>();
//builder.Services.AddTransient(typeof(INotificationHandler<>), typeof(IdempotentDomainEventHandler<>));
//builder.Services.Decorate(typeof(INotificationHandler<>), typeof(IdempotentDomainEventHandler<>));
WebApplication app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseStaticFiles();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
