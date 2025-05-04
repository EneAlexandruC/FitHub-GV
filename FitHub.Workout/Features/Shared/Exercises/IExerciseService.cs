using System.Collections.Generic;
using System.Threading.Tasks;

namespace FitHub.WorkoutManagement.Features.Shared.Exercises
{
    public interface IExerciseService
    {
        Task<WorkoutExerciseGetDTO?> GetExerciseById(int ID);
        Task<IEnumerable<WorkoutExerciseGetDTO>> GetAllExercises();
    }
} 