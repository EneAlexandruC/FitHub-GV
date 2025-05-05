namespace FitHub.WorkoutManagement.Features.Shared.Exercises
{
    public class WorkoutExerciseGetDTO
    {
        public string ID { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Muscles { get; set; } = string.Empty;
        public string Equipment { get; set; } = string.Empty;
        public string Difficulty { get; set; } = string.Empty;
        public int Duration { get; set; }
        public int? Sets { get; set; }
        public int? Reps { get; set; }
        public string Image { get; set; } = string.Empty;
    }
}
