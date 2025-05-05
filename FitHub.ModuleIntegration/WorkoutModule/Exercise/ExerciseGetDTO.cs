namespace FitHub.ModuleIntegration.Workout.Exercise
{
    using System.Text.Json.Serialization;
    public class WorkoutExerciseGetDTO
    {
        [JsonPropertyName("id")]
        public int ID { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;

        [JsonPropertyName("category")]
        public string Category { get; set; } = string.Empty;

        [JsonPropertyName("muscles")]
        public string Muscles { get; set; } = string.Empty;

        [JsonPropertyName("equipment")]
        public string Equipment { get; set; } = string.Empty;

        [JsonPropertyName("difficulty")]
        public int Difficulty { get; set; }
    }
}
