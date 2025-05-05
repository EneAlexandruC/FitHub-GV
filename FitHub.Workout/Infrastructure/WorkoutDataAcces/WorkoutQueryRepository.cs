using FitHub.WorkoutManagement.Domain.WorkoutDomain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitHub.WorkoutManagement.Infrastructure.WorkoutDataAcces
{
    public class WorkoutQueryRepository : IWorkoutQueryRepository
    {
        private readonly WorkoutDbContext dbContext;

        public WorkoutQueryRepository(WorkoutDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Domain.WorkoutDomain.Workout?> GetWorkoutById(int id)
        {
            return await dbContext.Workouts
                .Include(w => w.WorkoutExercises)
                .ThenInclude(we => we.Exercise)
                .FirstOrDefaultAsync(w => w.ID == id);
        }

        public async Task<IEnumerable<Domain.WorkoutDomain.Workout>> GetAllWorkouts()
        {
            return await dbContext.Workouts
                .Include(w => w.WorkoutExercises)
                .ThenInclude(we => we.Exercise)
                .ToListAsync();
        }

        public async Task SaveChanges()
        {
            await dbContext.SaveChangesAsync();
        }
    }
}
