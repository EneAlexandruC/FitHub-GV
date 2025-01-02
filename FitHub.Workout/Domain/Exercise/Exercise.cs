namespace FitHub.WorkoutManagement.Domain.Exercise
{
    public class Exercise
    {
        public int ID { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string MuscleGroup { get; set; } = string.Empty;
    }
}
