using FitHub.WorkoutManagement.Domain.ExerciseDomain;
using WorkoutExerciseGetDTO = FitHub.ModuleIntegration.Workout.Exercise.WorkoutExerciseGetDTO;
using static FitHub.WorkoutManagement.Features.Shared.ExerciseShared.ExerciseGetDTOMapper;

namespace FitHub.WorkoutManagement.Features.GetExercise
{
    public class GetExerciseQueryHandler
    {
        private readonly IExerciseQueryRepository exerciseQueryRepository;

        public GetExerciseQueryHandler(IExerciseQueryRepository exerciseQueryRepository)
        {
            this.exerciseQueryRepository = exerciseQueryRepository;
        }

        public async Task<WorkoutExerciseGetDTO?> Handle(GetExerciseQuery query)
        {
            if (query.ID <= 0)
            {
                throw new ArgumentException("An ID must be provided", nameof(query.ID));
            }

            var exercise = await exerciseQueryRepository.GetExerciseById(query.ID);
            if (exercise == null)
            {
                throw new InvalidOperationException($"No exercise found with ID {query.ID}");
            }

            return exercise.ExerciseGetDTO();
        }
    }
}
