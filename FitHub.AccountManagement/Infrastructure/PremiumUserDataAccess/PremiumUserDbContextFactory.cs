using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace FitHub.AccountManagement.Infrastructure.PremiumUserDataAccess
{
    public class PremiumUserDbContextFactory : IDesignTimeDbContextFactory<PremiumUserDbContext>
    {
        public PremiumUserDbContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
               .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "..", "FitHub.Server"))
               .AddJsonFile("appsettings.json")
               .Build();

            var optionsBuilder = new DbContextOptionsBuilder<PremiumUserDbContext>();
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));

            return new PremiumUserDbContext(optionsBuilder.Options);
        }
    }
}
