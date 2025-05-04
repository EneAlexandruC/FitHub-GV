using FitHub.WorkoutManagement.Domain.WorkoutDomain;

namespace FitHub.WorkoutManagement.Domain.WorkoutDomain
{
    public interface IWorkoutQueryRepository
    {
        Task<Workout?> GetWorkoutById(int id);
        Task<IEnumerable<Workout>> GetAllWorkouts();
        Task SaveChanges();
    }
}
