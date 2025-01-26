using FitHub.WorkoutManagement.Domain.ExerciseDomain;
using FitHub.WorkoutManagement.Infrastructure.WorkoutDataAcces;
using Microsoft.EntityFrameworkCore;

namespace FitHub.WorkoutManagement.Infrastructure.ExerciseDataAcces
{
    public class ExerciseQueryRepository(WorkoutDbContext workoutDbContext) : IExerciseQueryRepository
    {
        public async Task<Exercise?> GetExerciseById(int ID)
        {
            return await workoutDbContext.Exercises.FirstOrDefaultAsync(x => x.ID == ID);
        }

        public async Task SaveChanges()
        {
            await workoutDbContext.SaveChangesAsync();
        }
    }
}
