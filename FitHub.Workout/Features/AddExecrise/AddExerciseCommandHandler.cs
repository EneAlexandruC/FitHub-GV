using FitHub.WorkoutManagement.Domain.Exercise;

namespace FitHub.WorkoutManagement.Features.AddExecrise
{
    public class AddExerciseCommandHandler(IExerciseCommandRepository repository)
    {
        public async Task<Exercise> Handle(AddExerciseCommand command)
        {
            await repository.AddExercise(command.exercise);

            await repository.SaveChanges();

            return command.exercise;
        }
    }
}
