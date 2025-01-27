using FitHub.AdminManagement.Domain.Admin;
using Microsoft.EntityFrameworkCore;

namespace FitHub.AdminManagement.Infrastructure.AdminDataAccess
{
    public class AdminDbContext: DbContext
    {
        public AdminDbContext(DbContextOptions<AdminDbContext> options)
         : base(options)
        {
        }
        public DbSet<Admin> Admins { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Admin>(entity =>
            {
                entity.ToTable("Admin");
                entity.HasKey(c => c.ID);
                entity.Property(c => c.Username)
                    .IsRequired()
                    .HasMaxLength(30);
                entity.Property(c => c.Password)
                    .IsRequired()
                    .HasMaxLength(100);
            });
        }
    }
}
