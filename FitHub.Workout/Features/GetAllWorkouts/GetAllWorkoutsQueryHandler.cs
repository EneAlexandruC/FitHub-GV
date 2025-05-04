using FitHub.ModuleIntegration.WorkoutModule.Workout;
using FitHub.Workout.Features.Shared.WorkoutShared;
using FitHub.WorkoutManagement.Domain.WorkoutDomain;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;

namespace FitHub.Workout.Features.GetAllWorkouts
{
    public class GetAllWorkoutsQueryHandler : IRequestHandler<GetAllWorkoutsQuery, IEnumerable<WorkoutGetDTO>>
    {
        private readonly IWorkoutQueryRepository workoutQueryRepository;

        public GetAllWorkoutsQueryHandler(IWorkoutQueryRepository workoutQueryRepository)
        {
            this.workoutQueryRepository = workoutQueryRepository;
        }

        public async Task<IEnumerable<WorkoutGetDTO>> Handle(GetAllWorkoutsQuery request, CancellationToken cancellationToken)
        {
            var workouts = await workoutQueryRepository.GetAllWorkouts();
            return workouts.Select(w => w.ToDTO());
        }
    }
}
