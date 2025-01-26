using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitHub.ModuleIntegration.WorkoutModule.Workout
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
    }
}
