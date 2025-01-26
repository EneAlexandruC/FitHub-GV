using FitHub.ModuleIntegration.AccountManagement.RegularUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitHub.ModuleIntegration.WorkoutModule.Workout
{
    public interface IWorkoutService
    {
        Task<WorkoutGetDTO> GetWorkoutById(int id);

        Task<IEnumerable<WorkoutGetDTO>> GetAllWorkouts();
    }
}
