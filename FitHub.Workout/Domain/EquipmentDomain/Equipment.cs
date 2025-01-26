using FitHub.WorkoutManagement.Domain.JoinEntry;

namespace FitHub.WorkoutManagement.Domain.EquipmentDomain
{
    public class Equipment
    {
        public int ID { get; set; }
        public string Name { get; set; } = string.Empty;
        public List<ExercisesEquipments> ExercisesEquipments = new List<ExercisesEquipments>();

        private Equipment() { }

        public static Equipment Create(string name)
        {
            return new Equipment
            {
                Name = name
            };
        }
    }
}
