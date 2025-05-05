using FitHub.ModuleIntegration.WorkoutModule.Workout;
using FitHub.Workout.Features.Shared.WorkoutShared;
using FitHub.WorkoutManagement.Domain.WorkoutDomain;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace FitHub.Workout.Features.GetWorkout
{
    public class GetWorkoutQueryHandler : IRequestHandler<GetWorkoutQuery, WorkoutGetDTO>
    {
        private readonly IWorkoutQueryRepository workoutQueryRepository;

        public GetWorkoutQueryHandler(IWorkoutQueryRepository workoutQueryRepository)
        {
            this.workoutQueryRepository = workoutQueryRepository;
        }

        public async Task<WorkoutGetDTO> Handle(GetWorkoutQuery request, CancellationToken cancellationToken)
        {
            var workout = await workoutQueryRepository.GetWorkoutById(request.Id);

            if (workout == null)
            {
                return null;
            }

            return workout.ToDTO();
        }
    }
}
