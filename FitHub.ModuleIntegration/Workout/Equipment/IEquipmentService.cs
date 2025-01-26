namespace FitHub.ModuleIntegration.Workout.Equipment
{
    public interface IEquipmentService
    {
        Task<EquipmentGetDTO?> GetEquipmentById(int id);
    }
}
