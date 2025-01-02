using FitHub.ModuleIntegration.Workout.Exercise;
using FitHub.WorkoutManagement.Domain.Exercise;

namespace FitHub.WorkoutManagement.Features.Shared
{
    public static class ExerciseAddDTOMapper
    {
        public static Exercise ToDomainObject(this ExerciseAddDTO addExerciseDto)
        {
            return Exercise.Create(
                addExerciseDto.Name,
                addExerciseDto.Description,
                addExerciseDto.Category,
                addExerciseDto.Muscles,
                addExerciseDto.Equipment,
                addExerciseDto.Difficulty
            );
        }
    }
}
