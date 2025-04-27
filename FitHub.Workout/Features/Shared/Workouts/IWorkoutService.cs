using System.Collections.Generic;
using System.Threading.Tasks;

namespace FitHub.WorkoutManagement.Features.Shared.Workouts
{
    public interface IWorkoutService
    {
        Task<WorkoutGetDTO?> GetWorkoutById(int id);
        Task<IEnumerable<WorkoutGetDTO>> GetAllWorkouts();
    }
}
