using FitHub.WorkoutManagement.Domain.ExerciseDomain;
using FitHub.WorkoutManagement.Features.Shared.Exercises;
using FitHub.WorkoutManagement.Features.Shared.ExerciseShared;
using FitHub.ModuleIntegration.Workout.Exercise;
using static FitHub.WorkoutManagement.Features.Shared.ExerciseShared.ExerciseGetDTOMapper;
using WorkoutIExerciseService = FitHub.ModuleIntegration.Workout.Exercise.IExerciseService;
using WorkoutExerciseGetDTO = FitHub.ModuleIntegration.Workout.Exercise.WorkoutExerciseGetDTO;

namespace FitHub.WorkoutManagement.Infrastructure
{
    public class ExerciseService : WorkoutIExerciseService
    {
        private readonly IExerciseQueryRepository exerciseQueryRepository;
        private readonly IExerciseCommandRepository exerciseCommandRepository;

        public ExerciseService(
            IExerciseQueryRepository exerciseQueryRepository,
            IExerciseCommandRepository exerciseCommandRepository)
        {
            this.exerciseQueryRepository = exerciseQueryRepository;
            this.exerciseCommandRepository = exerciseCommandRepository;
        }

        public async Task<WorkoutExerciseGetDTO?> GetExerciseById(int id)
        {
            var exercise = await exerciseQueryRepository.GetExerciseById(id);
            return exercise?.ExerciseGetDTO();
        }

        public async Task<IEnumerable<WorkoutExerciseGetDTO>> GetAllExercises()
        {
            var exercises = await exerciseQueryRepository.GetAllExercises();
            return exercises.Select(e => e.ExerciseGetDTO());
        }

        public async Task<WorkoutExerciseGetDTO> AddExercise(ExerciseAddDTO exerciseDTO)
        {
            var exercise = exerciseDTO.ToDomainObject();
            var addedExercise = await exerciseCommandRepository.AddExercise(exercise);
            return addedExercise.ExerciseGetDTO();
        }

        public async Task<WorkoutExerciseGetDTO> UpdateExercise(int id, ExerciseAddDTO exerciseDTO)
        {
            var existingExercise = await exerciseQueryRepository.GetExerciseById(id);
            if (existingExercise == null)
            {
                throw new KeyNotFoundException($"Exercise with ID {id} not found.");
            }

            var updatedExercise = exerciseDTO.ToDomainObject();
            updatedExercise.ID = id;
            var result = await exerciseCommandRepository.UpdateExercise(updatedExercise);
            return result.ExerciseGetDTO();
        }

        public async Task DeleteExercise(int id)
        {
            var exercise = await exerciseQueryRepository.GetExerciseById(id);
            if (exercise == null)
            {
                throw new KeyNotFoundException($"Exercise with ID {id} not found.");
            }

            await exerciseCommandRepository.DeleteExercise(exercise);
        }
    }
}
