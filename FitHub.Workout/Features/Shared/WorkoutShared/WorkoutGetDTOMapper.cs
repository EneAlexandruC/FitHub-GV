using FitHub.ModuleIntegration.WorkoutModule.Workout;
using FitHub.WorkoutManagement.Domain.WorkoutDomain;

namespace FitHub.Workout.Features.Shared.WorkoutShared
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