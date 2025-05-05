using FitHub.ModuleIntegration.WorkoutModule.Workout;
using FitHub.WorkoutManagement.Domain.WorkoutDomain;
using WorkoutGetDTO = FitHub.ModuleIntegration.WorkoutModule.Workout.WorkoutGetDTO;
using WorkoutExerciseGetDTO = FitHub.ModuleIntegration.Workout.Exercise.WorkoutExerciseGetDTO;
using static FitHub.WorkoutManagement.Features.Shared.ExerciseShared.ExerciseGetDTOMapper;

namespace FitHub.Workout.Features.Shared.Workouts
{
    public static class WorkoutGetDTOMapper
    {
        public static WorkoutGetDTO ToDTO(this FitHub.WorkoutManagement.Domain.WorkoutDomain.Workout workout)
        {
            return new WorkoutGetDTO
            {
                Id = workout.ID,
                Name = workout.Name,
                Description = workout.Description,
                Type = workout.Type,
                Difficulty = workout.Difficulty,
                ImageUrl = workout.ImageUrl,
                Duration = workout.Duration,
                CaloriesBurned = workout.CaloriesBurned
            };
        }
    }
}
