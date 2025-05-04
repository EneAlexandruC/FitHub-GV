using FitHub.WorkoutManagement.Domain.JoinEntry;
using FitHub.ModuleIntegration.WorkoutModule.Workout;

namespace FitHub.WorkoutManagement.Domain.WorkoutDomain
{
    public class Workout
    {
        public int ID { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public WorkoutType Type { get; set; }
        public WorkoutDifficulty Difficulty { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public string Duration { get; set; } = string.Empty;
        public string CaloriesBurned { get; set; } = string.Empty;

        public List<WorkoutExercise> WorkoutExercises { get; set; } = new List<WorkoutExercise>();
    }
}
