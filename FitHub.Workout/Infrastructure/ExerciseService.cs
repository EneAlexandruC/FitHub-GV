using FitHub.ModuleIntegration.Workout.Exercise;
using FitHub.WorkoutManagement.Features.AddExecrise;

namespace FitHub.WorkoutManagement.Infrastructure
{
    public class ExerciseService(AddExerciseCommandHandler addExerciseCommandHandler) : IExerciseService
    {
        public async Task<ExerciseGetDTO> GetExercise(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<ExerciseGetDTO> AddExercise(ExerciseAddDTO exercise)
        {
            // TODO: Remake this function after how regularuser was implemented

            var command = new AddExerciseCommand(exercise);
            var result = await addExerciseCommandHandler.Handle(command);

            return new ExerciseGetDTO(result);
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
