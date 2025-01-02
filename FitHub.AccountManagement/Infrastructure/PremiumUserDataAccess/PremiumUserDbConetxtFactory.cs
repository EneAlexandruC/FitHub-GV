using FitHub.AccountManagement.Infrastructure.PremiumUserDataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace FitHub.AccountManagement.Infrastructure.UserDataAccess
{
    public class PremiumUserDbContextFactory : IDesignTimeDbContextFactory<PremiumUserDbContext>
    {
        public PremiumUserDbContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
               .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "..", "FitHub.Server"))  // Set the base path for the app
               .AddJsonFile("appsettings.json") // Specify the appsettings.json file
               .Build();

            var optionsBuilder = new DbContextOptionsBuilder<PremiumUserDbContext>();
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));

            return new PremiumUserDbContext(optionsBuilder.Options);
        }
    }
}