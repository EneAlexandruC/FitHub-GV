using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitHub.WorkoutManagement.Migrations
{
    /// <inheritdoc />
    public partial class ImprovedWorkoutTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Notes",
                table: "Workout",
                newName: "Name");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Workout",
                type: "nvarchar(3000)",
                maxLength: 3000,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(1000)",
                oldMaxLength: 1000);

            migrationBuilder.AddColumn<string>(
                name: "CaloriesBurned",
                table: "Workout",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Difficulty",
                table: "Workout",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Duration",
                table: "Workout",
                type: "nvarchar(3000)",
                maxLength: 3000,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Workout",
                type: "nvarchar(3000)",
                maxLength: 3000,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "Workout",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CaloriesBurned",
                table: "Workout");

            migrationBuilder.DropColumn(
                name: "Difficulty",
                table: "Workout");

            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Workout");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Workout");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Workout");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Workout",
                newName: "Notes");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Workout",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(3000)",
                oldMaxLength: 3000);
        }
    }
}
