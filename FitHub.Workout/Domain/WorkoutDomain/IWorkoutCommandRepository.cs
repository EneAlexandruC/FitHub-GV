namespace FitHub.WorkoutManagement.Domain.WorkoutDomain
{
    public interface IWorkoutCommandRepository
    {
        Task<Workout> AddWorkout(Workout workout);
        Task<Workout> UpdateWorkout(Workout workout);
        Task DeleteWorkout(Workout workout);
        Task SaveChanges();
    }
} 