namespace FitHub.WorkoutManagement.Domain.EquipmentDomain
{
    public interface IEquipmentQueryRepository
    {
        Task<Equipment> GetEquipmentById(int ID);
        Task SaveChanges();
    }
}
