using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace FitHub.WorkoutManagement.Infrastructure.WorkoutDataAcces
{
    public class WorkoutDbContextFactory : IDesignTimeDbContextFactory<WorkoutDbContext>
    {
        public WorkoutDbContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
               .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "..", "FitHub.Server"))  // Set the base path for the app
               .AddJsonFile("appsettings.json") // Specify the appsettings.json file
               .Build();

            var optionsBuilder = new DbContextOptionsBuilder<WorkoutDbContext>();
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));

            return new WorkoutDbContext(optionsBuilder.Options);
        }
    }
}

