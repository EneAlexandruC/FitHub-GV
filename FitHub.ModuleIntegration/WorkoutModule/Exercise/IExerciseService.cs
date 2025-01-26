namespace FitHub.ModuleIntegration.Workout.Exercise
{
    public interface IExerciseService
    {
        Task<ExerciseGetDTO> GetExerciseById(int ID);
        Task<ExerciseGetDTO> AddExercise(ExerciseAddDTO exercise);
        Task<ExerciseGetDTO> UpdateExercise(int id, ExerciseAddDTO exercise);
        Task DeleteExercise(int id);
    }
}
