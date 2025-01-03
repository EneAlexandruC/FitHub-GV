namespace FitHub.WorkoutManagement.Domain.ExerciseDomain
{
    public interface IExerciseQueryRepository
    {
        Task<Exercise> GetExerciseById(int ID);

        Task SaveChanges();
    }
}
