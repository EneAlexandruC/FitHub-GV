using FitHub.AccountManagement.Domain.PremiumUser;
using FitHub.AccountManagement.Domain.RegularUser;
using Microsoft.EntityFrameworkCore;

namespace FitHub.AccountManagement.Infrastructure.PremiumUserDataAccess
{
    public class PremiumUserDbContext : DbContext
    {
        public PremiumUserDbContext(DbContextOptions<PremiumUserDbContext> options)
         : base(options)
        {
        }
        public DbSet<PremiumUser> PremiumUsers { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<PremiumUser>(entity =>
            {
                entity.ToTable("PremiumUser");
                entity.HasKey(c => c.ID);

                entity.Property(c => c.RegularUserID)
                    .IsRequired();

                // Configure the foreign key relationship
                entity.HasOne<RegularUser>()
                      .WithMany()
                      .HasForeignKey(c => c.RegularUserID)
                      .HasPrincipalKey("ID")
                      .HasConstraintName("FK_PremiumUser_RegularUser")
                      .OnDelete(DeleteBehavior.Cascade);

                modelBuilder.Entity<RegularUser>().ToTable("RegularUser", t => t.ExcludeFromMigrations());

                entity.Property(c => c.SubscriptionStartDate)
                    .IsRequired()
                    .HasColumnType("date");

                entity.Property(c => c.SubscriptionEndDate)
                    .IsRequired()
                    .HasColumnType("date");
            });

            // Map the existing RegularUser table
            modelBuilder.Entity<RegularUser>().ToTable("RegularUser");
        }
    }
}