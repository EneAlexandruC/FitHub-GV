using FitHub.WorkoutManagement.Domain.Exercise;
using FitHub.WorkoutManagement.Infrastructure.WorkoutDataAcces;

namespace FitHub.WorkoutManagement.Infrastructure.ExerciseDataAcces
{
    public class ExerciseCommadRepository(WorkoutDbContext dbContext) : IExerciseCommandRepository
    {
        public async Task<Exercise> AddExercise(Exercise exercise)
        {
            dbContext.Add(exercise);
            await dbContext.SaveChangesAsync();

            return exercise;
        }

        public async Task SaveChanges()
        {
            await dbContext.SaveChangesAsync();
        }
    }
}
