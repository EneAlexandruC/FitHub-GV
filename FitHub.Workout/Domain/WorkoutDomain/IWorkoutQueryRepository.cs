namespace FitHub.WorkoutManagement.Domain.WorkoutDomain
{
    public interface IWorkoutQueryRepository
    {
        Task<Workout> GetWorkoutByID(int id);
        Task SaveChanges();
    }
}
