using FitHub.ModuleIntegration.Workout.Equipment;
using FitHub.WorkoutManagement.Domain.EquipmentDomain;

namespace FitHub.WorkoutManagement.Features.Shared.EquipmentShared
{
    public static class EquipmentGetDTOMapper
    {
        public static EquipmentGetDTO EquipmentGetDTO(this Equipment equipment)
        {
            return new EquipmentGetDTO
            {
                ID = equipment.ID,
                Name = equipment.Name
            };
        }
    }
}
