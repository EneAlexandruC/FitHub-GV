using System.Collections.Generic;
using System.Threading.Tasks;
using FitHub.Workout.Domain.WorkoutDomain;

namespace FitHub.Workout.Infrastructure
{
    public interface IWorkoutService
    {
        Task<object> GetWorkoutById(int id);
        Task<IEnumerable<object>> GetAllWorkouts();
        Task<object> CreateWorkout(WorkoutCreateDTO workoutDto);
    }
}
