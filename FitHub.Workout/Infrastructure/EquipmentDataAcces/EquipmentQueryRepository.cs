using FitHub.WorkoutManagement.Domain.EquipmentDomain;
using FitHub.WorkoutManagement.Infrastructure.WorkoutDataAcces;
using Microsoft.EntityFrameworkCore;

namespace FitHub.WorkoutManagement.Infrastructure.EquipmentDataAcces
{
    public class EquipmentQueryRepository (WorkoutDbContext dbContext) : IEquipmentQueryRepository
    {
        public async Task<Equipment?> GetEquipmentById(int ID)
        {
            return await dbContext.Equipments.FirstOrDefaultAsync(x => x.ID == ID);
        }

        public async Task SaveChanges()
        {
            await dbContext.SaveChangesAsync();
        }
    }
}
