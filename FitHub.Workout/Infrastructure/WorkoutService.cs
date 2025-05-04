using FitHub.Workout.Domain.WorkoutDomain;
using FitHub.WorkoutManagement.Features.Shared.Workouts;
using FitHub.Workout.Features.GetAllWorkouts;
using FitHub.Workout.Features.GetWorkout;
using MediatR;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FitHub.Workout.Infrastructure
{
    public class WorkoutService : IWorkoutService
    {
        private readonly IMediator mediator;

        public WorkoutService(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public async Task<IEnumerable<object>> GetAllWorkouts()
        {
            return await mediator.Send(new GetAllWorkoutsQuery());
        }

        public async Task<object> GetWorkoutById(int id)
        {
            return await mediator.Send(new GetWorkoutQuery { Id = id });
        }

        public async Task<object> CreateWorkout(WorkoutCreateDTO workoutDto)
        {
            // Map WorkoutCreateDTO to entity
            var workoutEntity = new
            {
                Name = workoutDto.Name,
                Description = workoutDto.Description,
                // Map other properties as needed
                ImageUrl = workoutDto.ImageUrl,
                Duration = workoutDto.Duration,
                CaloriesBurned = workoutDto.CaloriesBurned
                // WorkoutExercises will need to be mapped as well
            };

            // Here you would typically use a command to create the workout
            // For now, we'll simulate the creation
            // In a real implementation, you would send a command via mediator or directly to a repository

            // Assuming the workout is created and ID is set by the database
            var createdWorkout = new { ID = 1, Name = workoutDto.Name, Description = workoutDto.Description, ImageUrl = workoutDto.ImageUrl, Duration = workoutDto.Duration, CaloriesBurned = workoutDto.CaloriesBurned };

            return createdWorkout;
        }
    }
}
