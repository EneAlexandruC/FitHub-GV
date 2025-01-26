using FitHub.ModuleIntegration.WorkoutModule.Workout;
using FitHub.WorkoutManagement.Domain.WorkoutDomain;


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
            };
        }
    }
}
