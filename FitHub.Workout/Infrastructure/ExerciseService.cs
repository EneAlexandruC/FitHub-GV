using FitHub.ModuleIntegration.Workout.Exercise;
using FitHub.WorkoutManagement.Features.AddExecrise;
using FitHub.WorkoutManagement.Features.GetExercise;
using FitHub.WorkoutManagement.Features.GetExercisesForWorkout;
using FitHub.WorkoutManagement.Features.Shared;
using Microsoft.IdentityModel.Protocols;

namespace FitHub.WorkoutManagement.Infrastructure
{
    public class ExerciseService(AddExerciseCommandHandler addExerciseCommandHandler, 
                                 GetExerciseQueryHandler getExerciseQueryHandler,
                                 GetExercisesForWorkoutQueryHandler getExercisesForWorkoutQueryHandler) : IExerciseService
    {
        public async Task<ExerciseGetDTO?> GetExerciseById(int ID)
        {
            var query = new GetExerciseQuery { ID = ID };
            var result = await getExerciseQueryHandler.Handle(query);

            if (result == null)
            {
                throw new Exception("Exercise not found");
            }

            return result;
        }

        public async Task<IEnumerable<ExerciseGetDTO?>> GetExercisesForWorkout(int ID)
        {
            var query = new GetExercisesForWorkoutQuery { ID = ID };
            var result = await getExercisesForWorkoutQueryHandler.Handle(query);

            if (result == null)
            {
                throw new Exception("No exercises found for this workout");
            }

            return result;
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
