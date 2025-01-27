using Azure;
using FitHub.AccountManagement.Infrastructure;
using FitHub.ModuleIntegration.AccountManagement.RegularUser;
using FitHub.ModuleIntegration.Workout.Exercise;
using FitHub.ModuleIntegration.WorkoutModule.Workout;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FitHub.Server.Controllers.Workout
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutController : ControllerBase
    {
        private readonly IWorkoutService workoutService;
        private readonly IExerciseService exerciseService;

        public WorkoutController(IWorkoutService workoutService, IExerciseService exerciseService)
        {
            this.workoutService = workoutService;
            this.exerciseService = exerciseService;
        }

        [HttpGet("get-workout-by-id")]
        public async Task<WorkoutGetDTO> GetWorkoutById([FromQuery] int id)
        {
            var response = await workoutService.GetWorkoutById(id);
            var workoutExercises = await exerciseService.GetExercisesForWorkout(id);

            response.Exercises = workoutExercises;

            return response;
        }


        [HttpGet("get-all-workouts")]
        public async Task<IEnumerable<WorkoutGetDTO>> GetAllWorkouts()
        {
            return await workoutService.GetAllWorkouts();
        }
    }
}
