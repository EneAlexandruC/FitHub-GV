using System.Collections.Generic;
using FitHub.WorkoutManagement.Features.Shared.Exercises;

namespace FitHub.WorkoutManagement.Features.Shared.Workouts
{
    public class WorkoutGetDTO
    {
        public int ID { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string Difficulty { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public string Duration { get; set; } = string.Empty;
        public string CaloriesBurned { get; set; } = string.Empty;
        public List<ExerciseGetDTO> Exercises { get; set; } = new List<ExerciseGetDTO>();
    }
}
