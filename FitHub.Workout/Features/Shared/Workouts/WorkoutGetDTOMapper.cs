
using FitHub.WorkoutManagement.Domain.WorkoutDomain;
using FitHub.WorkoutManagement.Features.Shared.Exercises;

namespace FitHub.WorkoutManagement.Features.Shared.Workouts
{
    public static class WorkoutGetDTOMapper
    {
        public static WorkoutGetDTO ToWorkoutGetDTO(this Workout workout)
        {
            return new WorkoutGetDTO
            {
                ID = workout.ID,
                Name = workout.Name,
                Description = workout.Description,
                Type = workout.Type,
                Difficulty = workout.Difficulty,
                Image = workout.Image,
                Duration = workout.Duration,
                CaloriesBurned = workout.CaloriesBurned,
                Exercises = workout.WorkoutExercises?.Select(we => new ExerciseGetDTO
                {
                    ID = we.Exercise.ID,
                    Name = we.Exercise.Name,
                    Description = we.Exercise.Description,
                    Category = we.Exercise.Category,
                    Muscles = we.Exercise.Muscles,
                    Equipment = we.Exercise.Equipment,
                    Difficulty = we.Exercise.Difficulty.ToString()
                }).ToList() ?? new List<ExerciseGetDTO>()
            };
        }
    }
}
