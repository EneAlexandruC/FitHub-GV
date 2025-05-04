using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FitHub.WorkoutManagement.Migrations
{
    /// <inheritdoc />
    public partial class UpdateWorkoutSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.InsertData(
                table: "Workout",
                columns: new[] { "ID", "CaloriesBurned", "Description", "Difficulty", "Duration", "Image", "Name", "Type" },
                values: new object[,]
                {
                    { 3, "200-300", "A calming yoga session focusing on flexibility and mindfulness", 0, "60 minutes", "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000", "Yoga Flow", 2 },
                    { 4, "250-350", "Intense core workout to strengthen your abs and lower back", 1, "30 minutes", "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000", "Core Crusher", 0 },
                    { 5, "500-600", "High-intensity functional movements for overall fitness", 3, "45 minutes", "https://images.unsplash.com/photo-1533681902576-196966181a8a?q=80&w=1000", "CrossFit Challenge", 5 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Workout",
                keyColumn: "ID",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Workout",
                keyColumn: "ID",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Workout",
                keyColumn: "ID",
                keyValue: 5);

            migrationBuilder.UpdateData(
                table: "Workout",
                keyColumn: "ID",
                keyValue: 1,
                column: "Image",
                value: "https://example.com/full-body.jpg");

            migrationBuilder.UpdateData(
                table: "Workout",
                keyColumn: "ID",
                keyValue: 2,
                column: "Image",
                value: "https://example.com/hiit.jpg");
        }
    }
}
