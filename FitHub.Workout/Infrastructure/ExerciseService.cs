using FitHub.ModuleIntegration.Workout.Exercise;
using FitHub.WorkoutManagement.Features.AddExecrise;
using FitHub.WorkoutManagement.Features.Shared;

namespace FitHub.WorkoutManagement.Infrastructure
{
    public class ExerciseService(AddExerciseCommandHandler addExerciseCommandHandler) : IExerciseService
    {
        public async Task<ExerciseGetDTO> GetExercise(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<ExerciseGetDTO> AddExercise(ExerciseAddDTO exerciseAddDTO)
        {
            // TODO: Remake this function after how regularuser was implemented (completed)

            var exerciseDomain = exerciseAddDTO.ToDomainObject();
            var addExerciseCommand = new AddExerciseCommand { exercise = exerciseDomain };
            var result = await addExerciseCommandHandler.Handle(addExerciseCommand);

            return result.ExerciseGetDTO();
        }

        public async Task<ExerciseGetDTO> UpdateExercise(int id, ExerciseAddDTO exercise)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteExercise(int id)
        {
            throw new NotImplementedException();
        }
    }
}
