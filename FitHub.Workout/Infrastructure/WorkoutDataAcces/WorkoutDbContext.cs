using FitHub.WorkoutManagement.Domain.EquipmentDomain;
using FitHub.WorkoutManagement.Domain.ExerciseDomain;
using FitHub.WorkoutManagement.Domain.JoinEntry;
using FitHub.WorkoutManagement.Domain.WorkoutDomain;

using Microsoft.EntityFrameworkCore;


namespace FitHub.WorkoutManagement.Infrastructure.WorkoutDataAcces
{
    public class WorkoutDbContext : DbContext
    {
        public WorkoutDbContext(DbContextOptions<WorkoutDbContext> options) : base(options) { }
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<Workout> Workouts { get; set; }
        public DbSet<WorkoutExercise> WorkoutExercises { get; set; }
        public DbSet<Equipment> Equipments { get; set; }
        public DbSet<ExercisesEquipments> ExercisesEquipments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Workout
            modelBuilder.Entity<Workout>(entity =>
            {
                entity.ToTable("Workout");
                entity.HasKey(c => c.ID);

                entity.Property(c => c.Name)
                     .IsRequired()
                     .HasMaxLength(1000);

                entity.Property(c => c.Description)
                    .IsRequired()
                    .HasMaxLength(3000);

                entity.Property(c => c.Type)
                    .IsRequired()
                    .HasConversion<int>();

                entity.Property(c => c.Difficulty)
                    .IsRequired()
                    .HasConversion<int>();

                entity.Property(c => c.Image)
                    .IsRequired()
                    .HasMaxLength(3000);

                entity.Property(c => c.Duration)
                    .IsRequired()
                    .HasMaxLength(3000);

                entity.Property(c => c.CaloriesBurned)
                    .IsRequired()
                    .HasMaxLength(10);
                
                
            });

            // Exercise
            modelBuilder.Entity<Exercise>(entity =>
            {
                entity.ToTable("Exercise");
                entity.HasKey(c => c.ID);

                entity.Property(c => c.Name)
                    .IsRequired()
                    .HasMaxLength(1000);

                entity.Property(c => c.Description)
                    .IsRequired()
                    .HasMaxLength(1000);

                entity.Property(c => c.Category)
                    .IsRequired()
                    .HasMaxLength(1000);

                entity.Property(c => c.Muscles)
                    .IsRequired()
                    .HasMaxLength(1000);

                entity.Property(c => c.Equipment)
                    .IsRequired()
                    .HasMaxLength(1000);

                entity.Property(c => c.Difficulty)
                    .IsRequired()
                    .HasConversion<int>();
            });

            // WorkoutExercise
            modelBuilder.Entity<WorkoutExercise>(entity =>
            {
                entity.ToTable("WorkoutExercise");
                entity.HasKey(we => new { we.WorkoutID, we.ExerciseID });

                entity.HasOne(we => we.Workout)
                    .WithMany(w => w.WorkoutExercises)
                    .HasForeignKey(we => we.WorkoutID);

                entity.HasOne(we => we.Exercise)
                    .WithMany(e => e.WorkoutExercises)
                    .HasForeignKey(we => we.ExerciseID);
            });

            // Equipment
            modelBuilder.Entity<Equipment>(entity =>
            {
                entity.ToTable("Equipment");
                entity.HasKey(c => c.ID);

                entity.Property(c => c.Name)
                    .IsRequired()
                    .HasMaxLength(1000);
            });

            // ExerciseEquipment
            modelBuilder.Entity<ExercisesEquipments>(entity =>
            {
                entity.ToTable("ExerciseEquipment");
                entity.HasKey(ee => new { ee.ExerciseID, ee.EquipmentID });

                entity.HasOne(ee => ee.Exercise)
                    .WithMany(e => e.ExercisesEquipments)
                    .HasForeignKey(ee => ee.ExerciseID);

                entity.HasOne(ee => ee.Equipment)
                    .WithMany(e => e.ExercisesEquipments)
                    .HasForeignKey(ee => ee.EquipmentID);
            });

        }
    }
}
