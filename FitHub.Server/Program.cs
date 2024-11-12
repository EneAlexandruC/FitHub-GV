using FitHub.AccountManagement.Features.Add;
using FitHub.AccoutManagement.Domain.RegularUser;
using FitHub.AccoutManagement.Infrastructure;
using FitHub.AccoutManagement.Infrastructure.UserDataAccess;
using FitHub.ModuleIntegration.AccountManagement.RegularUser;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
builder.Services.AddScoped<AddRegularUserCommandHandler>();
builder.Services.AddScoped<IRegularUserCommandRepository, RegularUserCommandRepository>();
builder.Services.AddScoped<IRegularUserService, RegularUserService>();
builder.Services.AddDbContext<RegularUserDbContext>(options =>
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
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<RegularUserDbContext>();
     
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}


app.Run();
