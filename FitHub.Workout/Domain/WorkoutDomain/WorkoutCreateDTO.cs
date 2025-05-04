using System.Collections.Generic;

namespace FitHub.Workout.Domain.WorkoutDomain
{
    public class WorkoutCreateDTO
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string Difficulty { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public string Duration { get; set; } = string.Empty;
        public string CaloriesBurned { get; set; } = string.Empty;
        public List<WorkoutExerciseDTO> WorkoutExercises { get; set; } = new List<WorkoutExerciseDTO>();
    }

    public class WorkoutExerciseDTO
    {
        public string ExerciseName { get; set; } = string.Empty;
        public int Sets { get; set; }
        public int Reps { get; set; }
        public string Description { get; set; } = string.Empty;
    }
}
