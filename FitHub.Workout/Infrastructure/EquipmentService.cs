using FitHub.ModuleIntegration.Workout.Equipment;
using FitHub.WorkoutManagement.Features.GetEquipment;

namespace FitHub.WorkoutManagement.Infrastructure
{
    public class EquipmentService(GetEquipmentQueryHandler getEquipmentQueryHandler) : IEquipmentService
    {
        public async Task<EquipmentGetDTO?> GetEquipmentById(int ID)
        {
            var query = new GetEquipmentQuery { ID = ID };
            var result = await getEquipmentQueryHandler.Handle(query);

            return result ?? throw new ArgumentException("Equipment not found");
        }
    }
}
