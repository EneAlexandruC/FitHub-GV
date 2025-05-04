using System.Threading.Tasks;

namespace FitHub.ModuleIntegration.Workout.Exercise
{
    public interface IExerciseService
    {
        Task<WorkoutExerciseGetDTO?> GetExerciseById(int ID);
        Task<IEnumerable<WorkoutExerciseGetDTO>> GetAllExercises();
        Task<WorkoutExerciseGetDTO> AddExercise(ExerciseAddDTO exercise);
        Task<WorkoutExerciseGetDTO> UpdateExercise(int id, ExerciseAddDTO exercise);
        Task DeleteExercise(int id);
    }
}
