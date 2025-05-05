using FitHub.WorkoutManagement.Domain.WorkoutDomain;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace FitHub.WorkoutManagement.Infrastructure.WorkoutDataAcces
{
    public class WorkoutCommandRepository : IWorkoutCommandRepository
    {
        private readonly WorkoutDbContext dbContext;

        public WorkoutCommandRepository(WorkoutDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Domain.WorkoutDomain.Workout> AddWorkout(Domain.WorkoutDomain.Workout workout)
        {
            dbContext.Add(workout);
            await dbContext.SaveChangesAsync();
            return workout;
        }

        public async Task<Domain.WorkoutDomain.Workout> UpdateWorkout(Domain.WorkoutDomain.Workout workout)
        {
            dbContext.Update(workout);
            await dbContext.SaveChangesAsync();
            return workout;
        }

        public async Task DeleteWorkout(Domain.WorkoutDomain.Workout workout)
        {
            dbContext.Remove(workout);
            await dbContext.SaveChangesAsync();
        }

        public async Task SaveChanges()
        {
            await dbContext.SaveChangesAsync();
        }
    }
} 