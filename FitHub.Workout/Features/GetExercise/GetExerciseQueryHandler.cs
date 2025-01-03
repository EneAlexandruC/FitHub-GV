using FitHub.ModuleIntegration.Workout.Exercise;
using FitHub.WorkoutManagement.Domain.ExerciseDomain;
using FitHub.WorkoutManagement.Features.Shared;

namespace FitHub.WorkoutManagement.Features.GetExercise
{
    public class GetExerciseQueryHandler(IExerciseQueryRepository exerciseQueryRepository)
    {
        public async Task<ExerciseGetDTO?> Handle (GetExerciseQuery query)
        {
            var exercise =  await exerciseQueryRepository.GetExerciseById(query.ID);
            return exercise.ExerciseGetDTO();
        }
    }
}
