namespace FitHub.WorkoutManagement.Domain.ExerciseDomain
{
    public interface IExerciseCommandRepository
    {
        Task<Exercise> AddExercise(Exercise exercise);
        Task<Exercise> UpdateExercise(Exercise exercise);
        Task DeleteExercise(Exercise exercise);
        Task SaveChanges();
    }
}
