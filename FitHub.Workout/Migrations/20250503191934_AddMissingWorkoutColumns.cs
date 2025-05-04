using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitHub.WorkoutManagement.Migrations
{
    /// <inheritdoc />
    public partial class AddMissingWorkoutColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Image",
                table: "Workout",
                newName: "ImageUrl");

            migrationBuilder.AddColumn<int>(
                name: "Reps",
                table: "WorkoutExercise",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Sets",
                table: "WorkoutExercise",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Reps",
                table: "WorkoutExercise");

            migrationBuilder.DropColumn(
                name: "Sets",
                table: "WorkoutExercise");

            migrationBuilder.RenameColumn(
                name: "ImageUrl",
                table: "Workout",
                newName: "Image");
        }
    }
}
