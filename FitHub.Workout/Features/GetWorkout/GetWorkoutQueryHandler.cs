using FitHub.ModuleIntegration.WorkoutModule.Workout;
using FitHub.WorkoutManagement.Domain.WorkoutDomain;
using FitHub.WorkoutManagement.Features.Shared.Workouts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitHub.WorkoutManagement.Features.GetWorkout
{
    public class GetWorkoutQueryHandler(IWorkoutQueryRepository workoutQueryRepository)
    {
        public async Task<WorkoutGetDTO?> Handle(GetWorkoutQuery query)
        {
            if (query.ID <= 0 || query.ID == null)
            {
                throw new ArgumentException("An ID must be provided", nameof(query.ID));
            }
            var workout = await workoutQueryRepository.GetWorkoutByID(query.ID);
            if (workout == null)
            {
                throw new InvalidOperationException($"No workout found with ID {query.ID}");
            }
            return workout.ToWorkoutGetDTO();
        }
    }
}
