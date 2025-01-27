namespace FitHub.ModuleIntegration.WorkoutModule.Equipment
{
    public interface IEquipmentService
    {
        Task<EquipmentGetDTO?> GetEquipmentById(int id);
    }
}
