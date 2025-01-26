using FitHub.ModuleIntegration.Workout.Equipment;
using FitHub.WorkoutManagement.Domain.EquipmentDomain;

namespace FitHub.WorkoutManagement.Features.Shared.EquipmentShared
{
    public static class EquipmentAddDTOMapper
    {
        public static Equipment ToDomainObject(this EquipmentAddDTO addEquipmentDto)
        {
            return Equipment.Create(
                addEquipmentDto.Name
            );
        }
    }
}
