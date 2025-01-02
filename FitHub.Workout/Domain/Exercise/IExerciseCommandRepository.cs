namespace FitHub.WorkoutManagement.Domain.Exercise
{
    public interface IExerciseCommandRepository
    {
        Task<Exercise> AddExercise(Exercise exercise);

        Task SaveChanges();
    }
}
