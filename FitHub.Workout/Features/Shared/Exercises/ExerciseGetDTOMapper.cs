using FitHub.WorkoutManagement.Domain.ExerciseDomain;

namespace FitHub.WorkoutManagement.Features.Shared.Exercises
{
    public static class ExerciseGetDTOMapper
    {
        public static WorkoutExerciseGetDTO ToExerciseGetDTO(this Exercise exercise)
        {
            return new WorkoutExerciseGetDTO
            {
                ID = exercise.ID.ToString(),
                Name = exercise.Name,
                Description = exercise.Description,
                Category = exercise.Category,
                Muscles = exercise.Muscles,
                Equipment = exercise.Equipment,
                Difficulty = exercise.Difficulty.ToString(),
                Duration = 0, // Default value, should be set from somewhere
                Image = string.Empty // Default value, should be set from somewhere
            };
        }
    }
} 