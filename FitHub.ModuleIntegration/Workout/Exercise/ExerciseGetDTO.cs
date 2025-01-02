namespace FitHub.ModuleIntegration.Workout.Exercise
{
    public class ExerciseGetDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Muscles { get; set; } = string.Empty;
        public string Equipment { get; set; } = string.Empty;
        public int Difflculty { get; set; }
    }
}
