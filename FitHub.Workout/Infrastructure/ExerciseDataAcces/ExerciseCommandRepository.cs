using FitHub.WorkoutManagement.Domain.ExerciseDomain;
using FitHub.WorkoutManagement.Infrastructure.WorkoutDataAcces;

namespace FitHub.WorkoutManagement.Infrastructure.ExerciseDataAcces
{
    public class ExerciseCommandRepository(WorkoutDbContext dbContext) : IExerciseCommandRepository
    {
        public async Task<Exercise> AddExercise(Exercise exercise)
        {
            dbContext.Add(exercise);
            await dbContext.SaveChangesAsync();

            return exercise;
        }

        public async Task<Exercise> UpdateExercise(Exercise exercise)
        {
            dbContext.Update(exercise);
            await dbContext.SaveChangesAsync();

            return exercise;
        }

        public async Task DeleteExercise(Exercise exercise)
        {
            dbContext.Remove(exercise);
            await dbContext.SaveChangesAsync();
        }

        public async Task SaveChanges()
        {
            await dbContext.SaveChangesAsync();
        }
    }
}
