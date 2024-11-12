using FitHub.AccoutManagement.Domain.PremiumUser;
using FitHub.AccoutManagement.Domain.RegularUser;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace FitHub.AccoutManagement.Infrastructure.UserDataAccess
{
    public class RegularUserDbContext : DbContext
    {
        public RegularUserDbContext(DbContextOptions<RegularUserDbContext> options)
         : base(options)
        {
        }
        public DbSet<RegularUser> Companies { get; set; }


        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)

        //{

        //    optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB; Database=FitHub; Trusted_Connection=true; Trust Server Certificate=true; MultipleActiveResultSets=true; Integrated Security=true;");

        //}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            modelBuilder.Entity<RegularUser>(entity =>
            {
                entity.ToTable("Regular Users");
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
                    .HasMaxLength (40);
            });

        }
    }
}
