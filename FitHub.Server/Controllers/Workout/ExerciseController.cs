using FitHub.ModuleIntegration.Workout.Exercise;
using Microsoft.AspNetCore.Mvc;

namespace FitHub.Server.Controllers.Workout
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExerciseController : ControllerBase
    {
        private readonly IExerciseService exerciseService;

        public ExerciseController(IExerciseService exerciseService)
        {
            this.exerciseService = exerciseService;
        }

        [HttpPost("add-exercise")]
        public async Task<ExerciseGetDTO> Post([FromBody] ExerciseAddDTO exerciseAddDTO)
        {
            if (exerciseAddDTO == null)
            {
                throw new ArgumentNullException(nameof(exerciseAddDTO));
            }

            var addedExercise = await exerciseService.AddExercise(exerciseAddDTO);

            return addedExercise;
        }

        [HttpGet("get-exercise")]
        public async Task<ExerciseGetDTO> Get([FromQuery] int ID)
        {
            var exercise = await exerciseService.GetExerciseById(ID);

            return exercise;
        }
    }
}
