using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitHub.ModuleIntegration.WorkoutModule.Workout
{
    public class WorkoutGetDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public WorkoutType Type { get; set; }
        public WorkoutDifficulty Difficulty { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public string Duration { get; set; } = string.Empty;
        public string CaloriesBurned { get; set; } = string.Empty;
    }
}
