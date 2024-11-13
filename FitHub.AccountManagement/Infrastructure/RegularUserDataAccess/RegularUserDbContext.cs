using FitHub.AccountManagement.Domain.RegularUser;
using Microsoft.EntityFrameworkCore;


namespace FitHub.AccountManagement.Infrastructure.UserDataAccess
{
    public class RegularUserDbContext : DbContext
    {
        public RegularUserDbContext(DbContextOptions<RegularUserDbContext> options)
         : base(options)
        {
        }
        public DbSet<RegularUser> RegularUsers { get; set; }


        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            modelBuilder.Entity<RegularUser>(entity =>
            {
                entity.ToTable("RegularUser");
                entity.HasKey(c => c.ID);

                entity.Property(c => c.LastName)
                    .IsRequired()
                    .HasMaxLength(30);

                entity.Property(c => c.FirstName)
                    .IsRequired()
                    .HasMaxLength(30);

                entity.Property(c => c.Email)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(c => c.Password)
                    .IsRequired()
                    .HasMaxLength (100);

                entity.Property(c => c.Weight)
                    .IsRequired();

                entity.Property(c => c.Height)
                    .IsRequired();

                entity.Property(c => c.DateOfBirth)
                    .IsRequired()
                    .HasColumnType("date");
            });

        }
    }
}
