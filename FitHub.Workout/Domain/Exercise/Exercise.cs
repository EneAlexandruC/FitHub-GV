namespace FitHub.WorkoutManagement.Domain.Exercise
{
    public class Exercise
    {
        public enum DifficultyLevel
        {
            Beginner = 0,
            Intermediate = 1,
            Advanced = 2
        }

        public int ID { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Muscles { get; set; } = string.Empty;
        public string Equipment { get; set; } = string.Empty;
        public DifficultyLevel Difficulty { get; set; }

        private Exercise() { }

        public static Exercise Create(string name, string description, string category, string muscles, string equipment, int difficulty)
        {
            return new Exercise()
            {
                Name = name,
                Description = description,
                Category = category,
                Muscles = muscles,
                Difficulty = (DifficultyLevel)difficulty,
                Equipment = equipment
            };
        }
    }
}
