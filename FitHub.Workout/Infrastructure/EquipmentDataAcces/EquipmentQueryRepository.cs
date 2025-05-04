using FitHub.WorkoutManagement.Domain.EquipmentDomain;
using FitHub.WorkoutManagement.Infrastructure.WorkoutDataAcces;
using Microsoft.EntityFrameworkCore;

namespace FitHub.WorkoutManagement.Infrastructure.EquipmentDataAcces
{
    public class EquipmentQueryRepository : IEquipmentQueryRepository
    {
        private readonly WorkoutDbContext _context;

        public EquipmentQueryRepository(WorkoutDbContext context)
        {
            _context = context;
        }

        public async Task<Equipment?> GetEquipmentById(int ID)
        {
            return await _context.Equipments
                .Include(e => e.ExercisesEquipments)
                .FirstOrDefaultAsync(e => e.ID == ID);
        }

        public async Task<IEnumerable<Equipment>> GetAllEquipments()
        {
            return await _context.Equipments
                .Include(e => e.ExercisesEquipments)
                .ToListAsync();
        }

        public async Task SaveChanges()
        {
            await _context.SaveChangesAsync();
        }
    }
}
