using FitHub.WorkoutManagement.Domain.ExerciseDomain;
using WorkoutExerciseGetDTO = FitHub.ModuleIntegration.Workout.Exercise.WorkoutExerciseGetDTO;

namespace FitHub.WorkoutManagement.Features.Shared.ExerciseShared
{
    public static class ExerciseGetDTOMapper
    {
        public static WorkoutExerciseGetDTO ExerciseGetDTO(this Exercise exercise)
        {
            return new WorkoutExerciseGetDTO
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
