using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitHub.WorkoutManagement.Migrations
{
    /// <inheritdoc />
    public partial class UpdateWorkoutImagesLocal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Workout",
                keyColumn: "ID",
                keyValue: 1,
                column: "Image",
                value: "/assets/img/pexels-photo-669576.jpeg");

            migrationBuilder.UpdateData(
                table: "Workout",
                keyColumn: "ID",
                keyValue: 2,
                column: "Image",
                value: "/assets/img/pexels-photo-703012.jpeg");

            migrationBuilder.UpdateData(
                table: "Workout",
                keyColumn: "ID",
                keyValue: 3,
                column: "Image",
                value: "/assets/img/photo-1485727749690-d091e8284ef3.jpg");

            migrationBuilder.UpdateData(
                table: "Workout",
                keyColumn: "ID",
                keyValue: 4,
                column: "Image",
                value: "/assets/img/pexels-photo-416778.jpeg");

            migrationBuilder.UpdateData(
                table: "Workout",
                keyColumn: "ID",
                keyValue: 5,
                column: "Image",
                value: "/assets/img/pexels-photo-949129.jpeg");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
    }
}
