using FitHub.AccountManagement.Features.Add;
using FitHub.AccountManagement.Domain.RegularUser;
using FitHub.AccountManagement.Infrastructure;
using FitHub.AccountManagement.Infrastructure.UserDataAccess;
using FitHub.ModuleIntegration.AccountManagement.RegularUser;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using FitHub.AccountManagement.Infrastructure.PremiumUserDataAccess;
using FitHub.AccountManagement.Features.AddPremiumUser;
using FitHub.ModuleIntegration.AccountManagement.PremiumUser;
using FitHub.AccountManagement.Domain.PremiumUser;
using FitHub.AccountManagement.Features.GetRegularUser;
using FitHub.AccountManagement.Infrastructure.RegularUserDataAccess;
using FitHub.AccountManagement.Features.UserAuth;

var builder = WebApplication.CreateBuilder(args);

// Added CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowDev", policy =>
    {
        policy.WithOrigins("https://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

// regular user services
builder.Services.AddScoped<UserLoginQueryHandler>();
builder.Services.AddScoped<AddRegularUserCommandHandler>();
builder.Services.AddScoped<GetRegularUserQueryHandler>();
builder.Services.AddScoped<IRegularUserCommandRepository, RegularUserCommandRepository>();
builder.Services.AddScoped<IRegularUserService, RegularUserService>();
builder.Services.AddScoped<IRegularUserQueryRepository, RegularUserQueryRepository>();
builder.Services.AddDbContext<RegularUserDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// premium user services
builder.Services.AddScoped<AddPremiumUserCommandHandler>();
builder.Services.AddScoped<IPremiumUserCommandRepository, PremiumUserCommandRepository>();
builder.Services.AddScoped<IPremiumUserService, PremiumUserService>();
builder.Services.AddDbContext<PremiumUserDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


var app = builder.Build();

//using (var scope = app.Services.CreateScope())
//{
//    var dbContext = scope.ServiceProvider.GetRequiredService<UserDbContext>();
//    try
//    {
//        if (!dbContext.Database.CanConnect())
//        {

//            throw new NotImplementedException("Failed to connect to the database.");
//        }
//    }
//    catch (Exception ex)
//    {
//        Console.WriteLine($"Database connection error: {ex.Message}");
//        throw;
//    }
//}



app.UseDefaultFiles();
app.UseStaticFiles();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    // Added CORS policy
    app.UseDeveloperExceptionPage();
}

// Added CORS policy
app.UseCors("AllowDev");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    services.GetRequiredService<RegularUserDbContext>();
    services.GetRequiredService<PremiumUserDbContext>();

}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}


app.Run();
