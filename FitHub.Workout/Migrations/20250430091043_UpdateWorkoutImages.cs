using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitHub.WorkoutManagement.Migrations
{
    /// <inheritdoc />
    public partial class UpdateWorkoutImages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Workout",
                keyColumn: "ID",
                keyValue: 1,
                column: "Image",
                value: "https://source.unsplash.com/random/800x600/?workout,strength");

            migrationBuilder.UpdateData(
                table: "Workout",
                keyColumn: "ID",
                keyValue: 2,
                column: "Image",
                value: "https://source.unsplash.com/random/800x600/?cardio,hiit");

            migrationBuilder.UpdateData(
                table: "Workout",
                keyColumn: "ID",
                keyValue: 3,
                column: "Image",
                value: "https://source.unsplash.com/random/800x600/?yoga,meditation");

            migrationBuilder.UpdateData(
                table: "Workout",
                keyColumn: "ID",
                keyValue: 4,
                column: "Image",
                value: "https://source.unsplash.com/random/800x600/?abs,core");

            migrationBuilder.UpdateData(
                table: "Workout",
                keyColumn: "ID",
                keyValue: 5,
                column: "Image",
                value: "https://source.unsplash.com/random/800x600/?crossfit,gym");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Workout",
                keyColumn: "ID",
                keyValue: 1,
                column: "Image",
                value: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000");

            migrationBuilder.UpdateData(
                table: "Workout",
                keyColumn: "ID",
                keyValue: 2,
                column: "Image",
                value: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000");

            migrationBuilder.UpdateData(
                table: "Workout",
                keyColumn: "ID",
                keyValue: 3,
                column: "Image",
                value: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000");

            migrationBuilder.UpdateData(
                table: "Workout",
                keyColumn: "ID",
                keyValue: 4,
                column: "Image",
                value: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000");

            migrationBuilder.UpdateData(
                table: "Workout",
                keyColumn: "ID",
                keyValue: 5,
                column: "Image",
                value: "https://images.unsplash.com/photo-1533681902576-196966181a8a?q=80&w=1000");
        }
    }
}
