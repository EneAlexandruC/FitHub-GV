
using FitHub.ModuleIntegration.Workout.Exercise;
using FitHub.WorkoutManagement.Domain.Exercise;

namespace FitHub.WorkoutManagement.Features.Shared
{
    public static class ExerciseGetDTOMapper
    {
        public static ExerciseGetDTO ExerciseGetDTO(this Exercise exercise)
        {
            return new ExerciseGetDTO
            {
                ID = exercise.ID,
                Name = exercise.Name,
                Description = exercise.Description,
                Category = exercise.Category,
                Muscles = exercise.Muscles,
                Equipment = exercise.Equipment,
                Difficulty = (int)exercise.Difficulty
            };
        }
    }
}
