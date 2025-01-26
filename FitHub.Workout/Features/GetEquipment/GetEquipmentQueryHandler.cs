using FitHub.ModuleIntegration.Workout.Equipment;
using FitHub.WorkoutManagement.Domain.EquipmentDomain;
using FitHub.WorkoutManagement.Features.Shared.EquipmentShared;

namespace FitHub.WorkoutManagement.Features.GetEquipment
{
    public class GetEquipmentQueryHandler(IEquipmentQueryRepository equipmentQueryRepository)
    {
        public async Task<EquipmentGetDTO?> Handle(GetEquipmentQuery query)
        {
            var equipment = await equipmentQueryRepository.GetEquipmentById(query.ID);
            return equipment.EquipmentGetDTO();
        }
    }
}
