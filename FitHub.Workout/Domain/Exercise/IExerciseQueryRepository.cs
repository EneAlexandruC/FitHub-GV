namespace FitHub.WorkoutManagement.Domain.Exercise
{
    public interface IExerciseQueryRepository
    {
        Task<Exercise> GetExerciseById(int ID);

        Task SaveChanges();
    }
}
