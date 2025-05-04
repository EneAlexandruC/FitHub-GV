using FitHub.ModuleIntegration.WorkoutModule.Workout;
using MediatR;
using System.Collections.Generic;

namespace FitHub.Workout.Features.GetAllWorkouts
{
    public class GetAllWorkoutsQuery : IRequest<IEnumerable<WorkoutGetDTO>>
    {
    }
}
