using FitHub.WorkoutManagement.Domain.Exercise;
using FitHub.WorkoutManagement.Domain.Workout;
using Microsoft.EntityFrameworkCore;

namespace FitHub.WorkoutManagement.Infrastructure.WorkoutDataAcces
{
    public class WorkoutDbContext : DbContext
    {
        public WorkoutDbContext(DbContextOptions<WorkoutDbContext> options) : base(options) { }
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<Workout> Workouts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Workout>(entity =>
            {
                entity.ToTable("Workout");
                entity.HasKey(c => c.ID);

                entity.Property(c => c.Notes)
                    .IsRequired()
                    .HasMaxLength(30);
            });

            // Exercise
            modelBuilder.Entity<Exercise>(entity =>
            {
                entity.ToTable("Exercise");
                entity.HasKey(c => c.ID);

                entity.Property(c => c.Name)
                    .IsRequired()
                    .HasMaxLength(30);

                entity.Property(c => c.Description)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(c => c.MuscleGroup)
                    .IsRequired()
                    .HasMaxLength(30);
            }
            );
        }
    }
}
