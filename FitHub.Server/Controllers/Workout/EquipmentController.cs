using FitHub.ModuleIntegration.WorkoutModule.Equipment;
using Microsoft.AspNetCore.Mvc;

namespace FitHub.Server.Controllers.Workout
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipmentController : ControllerBase
    {
        private readonly IEquipmentService equipmentService;

        public EquipmentController(IEquipmentService equipmentService)
        {
            this.equipmentService = equipmentService;
        }

        [HttpGet("get-equipment")]
        public async Task<EquipmentGetDTO> Get([FromQuery] int ID)
        {
            var equipment = await equipmentService.GetEquipmentById(ID);

            return equipment;
        }

        // TODO: Implement when needed
        //
        //[HttpPost("add-equipment")]
        //public async Task<EquipmentGetDTO> Post([FromBody] EquipmentAddDTO equipmentAddDTO)
        //{
        //    if (equipmentAddDTO == null)
        //    {
        //        throw new ArgumentNullException(nameof(equipmentAddDTO));
        //    }

        //    var addedEquipment = await equipmentService.AddEquipment(equipmentAddDTO);

        //    return addedEquipment;
        //}
    }
}
