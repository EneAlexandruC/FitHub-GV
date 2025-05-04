using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitHub.ModuleIntegration.WorkoutModule.Workout;
using FitHub.WorkoutManagement.Domain.WorkoutDomain;
using WorkoutGetDTO = FitHub.ModuleIntegration.WorkoutModule.Workout.WorkoutGetDTO;
using MediatR;

namespace FitHub.Workout.Features.GetWorkout;

public class GetWorkoutQuery : IRequest<WorkoutGetDTO>
{
    public int Id { get; set; }
}
