using FitHub.ModuleIntegration.WorkoutModule.Workout;
using FitHub.Workout.Infrastructure;
using MediatR;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace FitHub.Server
{
    public class WorkoutServiceAdapter : FitHub.ModuleIntegration.WorkoutModule.Workout.IWorkoutService
    {
        private readonly WorkoutService _workoutService;

        public WorkoutServiceAdapter(IMediator mediator)
        {
            _workoutService = new WorkoutService(mediator);
        }

        public async Task<FitHub.ModuleIntegration.WorkoutModule.Workout.WorkoutGetDTO?> GetWorkoutById(int id)
        {
            // Implementați logica pentru a obține un antrenament după ID
            // Deocamdată, returnăm un obiect mock
            return new FitHub.ModuleIntegration.WorkoutModule.Workout.WorkoutGetDTO { Id = id, Name = "Mock Workout", Description = "This is a mock workout." };
        }

        public async Task<IEnumerable<FitHub.ModuleIntegration.WorkoutModule.Workout.WorkoutGetDTO>> GetAllWorkouts()
        {
            // Implementați logica pentru a obține toate antrenamentele
            // Deocamdată, returnăm o listă statică
            return new List<FitHub.ModuleIntegration.WorkoutModule.Workout.WorkoutGetDTO>
            {
                new FitHub.ModuleIntegration.WorkoutModule.Workout.WorkoutGetDTO { Id = 1, Name = "Workout 1", Description = "First mock workout." },
                new FitHub.ModuleIntegration.WorkoutModule.Workout.WorkoutGetDTO { Id = 2, Name = "Workout 2", Description = "Second mock workout." }
            };
        }
    }
}
