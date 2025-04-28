using FitHub.AccountManagement.Infrastructure;
using FitHub.ModuleIntegration.AccountManagement.RegularUser;
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

        public WorkoutController(IWorkoutService workoutService)
        {
            this.workoutService = workoutService;
        }

        [HttpGet("get-workout-by-id")]
        public async Task<WorkoutGetDTO> GetWorkoutById([FromQuery] int id)
        {
            return await workoutService.GetWorkoutById(id);
        }

        [HttpGet("get-all-workouts")]
        public async Task<IEnumerable<WorkoutGetDTO>> GetAllWorkouts()
        {
            return await workoutService.GetAllWorkouts();
        }

        [HttpGet("search-workouts")]
        public async Task<IEnumerable<WorkoutGetDTO>> SearchWorkouts([FromQuery] string searchInput)
        {
            var workouts = await workoutService.GetAllWorkouts();
            return workouts
                .Where(w => w.Name.Contains(searchInput, StringComparison.OrdinalIgnoreCase) ||
                            w.Description.Contains(searchInput, StringComparison.OrdinalIgnoreCase))
                .ToList();
        }
    }
}
