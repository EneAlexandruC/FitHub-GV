namespace FitHub.WorkoutManagement.Domain.ExerciseDomain
{
    public interface IExerciseCommandRepository
    {
        Task<Exercise> AddExercise(Exercise exercise);

        Task SaveChanges();
    }
}
