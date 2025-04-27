using FitHub.WorkoutManagement.Domain.WorkoutDomain;
using Microsoft.EntityFrameworkCore;
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
            return await dbContext.Workouts
                .Include(w => w.WorkoutExercises)
                .ThenInclude(we => we.Exercise)
                .FirstOrDefaultAsync(w => w.ID == id);
        }
        public async Task<IEnumerable<Workout>> GetAllWorkouts()
        {
            return await dbContext.Workouts.ToListAsync();
        }

        public async Task SaveChanges()
        {
            await dbContext.SaveChangesAsync();
        }
    }
}
