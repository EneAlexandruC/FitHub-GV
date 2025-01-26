using FitHub.WorkoutManagement.Domain.WorkoutDomain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitHub.WorkoutManagement.Infrastructure.WorkoutDataAcces
{
    public class WorkoutQueryRepository(WorkoutDbContext dbContext) : IWorkoutQueryRepository
    {
        public async Task<Workout?> GetWorkoutByID(int id)
        {
            return await dbContext.Workouts.FindAsync(id);
        }

        public async Task SaveChanges()
        {
            await dbContext.SaveChangesAsync();
        }
    }
}
