using FitHub.WorkoutManagement.Domain.ExerciseDomain;

namespace FitHub.WorkoutManagement.Domain.ExerciseDomain
{
    public interface IExerciseQueryRepository
    {
        Task<Exercise?> GetExerciseById(int ID);
        Task<IEnumerable<Exercise>> GetAllExercises();
        Task SaveChanges();
    }
}
