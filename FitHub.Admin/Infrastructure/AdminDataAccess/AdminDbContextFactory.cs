using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace FitHub.AdminManagement.Infrastructure.AdminDataAccess
{
    public class AdminDbContextFactory: IDesignTimeDbContextFactory<AdminDbContext>
    {
        public AdminDbContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
               .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "..", "FitHub.Server"))  // Set the base path for the app
               .AddJsonFile("appsettings.json") // Specify the appsettings.json file
               .Build();
            var optionsBuilder = new DbContextOptionsBuilder<AdminDbContext>();
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            return new AdminDbContext(optionsBuilder.Options);
        }
    }
}
