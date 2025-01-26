using FitHub.WorkoutManagement.Domain.JoinEntry;

namespace FitHub.WorkoutManagement.Domain.WorkoutDomain
{
    public class Workout
    {
        public int ID { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
        public List<WorkoutExercise> WorkoutExercises { get; set; } = new List<WorkoutExercise>();
    }
}
