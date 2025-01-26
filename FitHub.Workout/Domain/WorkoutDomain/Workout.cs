using FitHub.WorkoutManagement.Domain.JoinEntry;

namespace FitHub.WorkoutManagement.Domain.WorkoutDomain
{
    public class Workout
    {
        public int ID { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string Difficulty { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public string Duration { get; set; } = string.Empty;
        public string CaloriesBurned { get; set; } = string.Empty;

        public List<WorkoutExercise> WorkoutExercises { get; set; } = new List<WorkoutExercise>();
    }
}
