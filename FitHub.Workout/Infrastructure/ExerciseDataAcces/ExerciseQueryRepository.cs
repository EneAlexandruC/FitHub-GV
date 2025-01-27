using FitHub.WorkoutManagement.Domain.ExerciseDomain;
using FitHub.WorkoutManagement.Infrastructure.WorkoutDataAcces;
using Microsoft.EntityFrameworkCore;

namespace FitHub.WorkoutManagement.Infrastructure.ExerciseDataAcces
{
    public class ExerciseQueryRepository(WorkoutDbContext dbContext) : IExerciseQueryRepository
    {
        public async Task<Exercise?> GetExerciseById(int ID)
        {
            return await dbContext.Exercises.FirstOrDefaultAsync(x => x.ID == ID);
        }

        public async Task<IEnumerable<Exercise>> GetExercisesForWorkout(int id)
        {
            return await dbContext.WorkoutExercises
                .Where(we => we.WorkoutID == id)
                .Select(we => we.Exercise)
                .ToListAsync();
        }

        public async Task SaveChanges()
        {
            await dbContext.SaveChangesAsync();
        }
    }
}
