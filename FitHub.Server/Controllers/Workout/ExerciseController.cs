using FitHub.ModuleIntegration.Workout.Exercise;
using FitHub.WorkoutManagement.Features.Shared.ExerciseShared;
using Microsoft.AspNetCore.Mvc;

namespace FitHub.Server.Controllers.Workout
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExerciseController : ControllerBase
    {
        private readonly IExerciseService exerciseService;

        public ExerciseController(IExerciseService exerciseService)
        {
            this.exerciseService = exerciseService;
        }

        [HttpPost]
        public async Task<WorkoutExerciseGetDTO> Post([FromBody] ExerciseAddDTO exerciseAddDTO)
        {
            if (exerciseAddDTO == null)
            {
                throw new ArgumentNullException(nameof(exerciseAddDTO));
            }

            var addedExercise = await exerciseService.AddExercise(exerciseAddDTO);
            return addedExercise;
        }

        [HttpPut("{id}")]
        public async Task<WorkoutExerciseGetDTO> Put(int id, [FromBody] ExerciseAddDTO exerciseAddDTO)
        {
            if (exerciseAddDTO == null)
            {
                throw new ArgumentNullException(nameof(exerciseAddDTO));
            }

            var updatedExercise = await exerciseService.UpdateExercise(id, exerciseAddDTO);
            return updatedExercise;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await exerciseService.DeleteExercise(id);
            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<WorkoutExerciseGetDTO?> Get(int id)
        {
            return await exerciseService.GetExerciseById(id);
        }

        [HttpGet]
        public async Task<IEnumerable<WorkoutExerciseGetDTO>> GetAll()
        {
            return await exerciseService.GetAllExercises();
        }
        [HttpPost("seed-exercises")]
        public async Task<IActionResult> SeedExercises([FromServices] FitHub.WorkoutManagement.Infrastructure.WorkoutDataAcces.WorkoutDbContext context)
        {
            if (!context.Exercises.Any())
            {
                context.Exercises.AddRange(
    FitHub.WorkoutManagement.Domain.ExerciseDomain.Exercise.Create("Push Up", "Piept", "Bodyweight", "Piept", "None", 0),
    FitHub.WorkoutManagement.Domain.ExerciseDomain.Exercise.Create("Squat", "Picioare", "Bodyweight", "Picioare", "None", 0),
    FitHub.WorkoutManagement.Domain.ExerciseDomain.Exercise.Create("Pull Up", "Spate", "Bodyweight", "Spate", "Bar", 1)
);
                await context.SaveChangesAsync();
            }
            return Ok("Seeded exercises");
        }
    }
}
