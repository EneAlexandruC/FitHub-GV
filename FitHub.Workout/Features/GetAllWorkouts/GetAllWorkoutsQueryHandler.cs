
using FitHub.WorkoutManagement.Domain.WorkoutDomain;
using FitHub.WorkoutManagement.Features.Shared.Workouts;
using static FitHub.WorkoutManagement.Features.Shared.Workouts.WorkoutGetDTOMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitHub.WorkoutManagement.Features.GetAllWorkouts
{
    public class GetAllWorkoutsQueryHandler(IWorkoutQueryRepository workoutQueryRepository)
    {
        public async Task<IEnumerable<WorkoutGetDTO>> Handle(GetAllWorkoutsQuery query)
        {
            var workouts = await workoutQueryRepository.GetAllWorkouts();

            if (workouts == null)
            {
                throw new InvalidOperationException("No workouts found");
            }

            return workouts.Select(workout => workout.ToWorkoutGetDTO());
        }
    }
}
