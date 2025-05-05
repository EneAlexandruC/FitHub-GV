using FitHub.ModuleIntegration.WorkoutModule.Workout;
using FitHub.Workout.Features.GetAllWorkouts;
using FitHub.Workout.Features.GetWorkout;
using FitHub.WorkoutManagement.Domain.WorkoutDomain;
using MediatR;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FitHub.Workout.Features.Shared.Workouts
{
    public class WorkoutService : IWorkoutService
    {
        private readonly IMediator mediator;

        public WorkoutService(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public async Task<IEnumerable<WorkoutGetDTO>> GetAllWorkouts()
        {
            return await mediator.Send(new GetAllWorkoutsQuery());
        }

        public async Task<WorkoutGetDTO?> GetWorkoutById(int id)
        {
            return await mediator.Send(new GetWorkoutQuery { Id = id });
        }
    }
}
