using FitHub.WorkoutManagement.Domain.ExerciseDomain;
using FitHub.WorkoutManagement.Infrastructure.WorkoutDataAcces;
using Microsoft.EntityFrameworkCore;

namespace FitHub.WorkoutManagement.Infrastructure.ExerciseDataAcces
{
    public class ExerciseQueryRepository : IExerciseQueryRepository
    {
        private readonly WorkoutDbContext _context;

        public ExerciseQueryRepository(WorkoutDbContext context)
        {
            _context = context;
        }

        public async Task<Exercise?> GetExerciseById(int ID)
        {
            return await _context.Exercises
                .Include(e => e.WorkoutExercises)
                .Include(e => e.ExercisesEquipments)
                .FirstOrDefaultAsync(e => e.ID == ID);
        }

        public async Task<IEnumerable<Exercise>> GetAllExercises()
        {
            return await _context.Exercises
                .Include(e => e.WorkoutExercises)
                .Include(e => e.ExercisesEquipments)
                .ToListAsync();
        }

        public async Task SaveChanges()
        {
            await _context.SaveChangesAsync();
        }
    }
}
