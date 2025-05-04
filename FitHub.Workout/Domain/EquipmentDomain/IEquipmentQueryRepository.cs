using FitHub.WorkoutManagement.Domain.EquipmentDomain;

namespace FitHub.WorkoutManagement.Domain.EquipmentDomain
{
    public interface IEquipmentQueryRepository
    {
        Task<Equipment?> GetEquipmentById(int ID);
        Task<IEnumerable<Equipment>> GetAllEquipments();
        Task SaveChanges();
    }
}
