using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FitHub.WorkoutManagement.Migrations
{
    /// <inheritdoc />
    public partial class AddWorkoutSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExerciseEquipment_Equipment_EquipmentID",
                table: "ExerciseEquipment");

            migrationBuilder.DropForeignKey(
                name: "FK_ExerciseEquipment_Exercise_ExerciseID",
                table: "ExerciseEquipment");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutExercise_Exercise_ExerciseID",
                table: "WorkoutExercise");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutExercise_Workout_WorkoutID",
                table: "WorkoutExercise");

            migrationBuilder.RenameColumn(
                name: "ExerciseID",
                table: "WorkoutExercise",
                newName: "ExerciseId");

            migrationBuilder.RenameColumn(
                name: "WorkoutID",
                table: "WorkoutExercise",
                newName: "WorkoutId");

            migrationBuilder.RenameIndex(
                name: "IX_WorkoutExercise_ExerciseID",
                table: "WorkoutExercise",
                newName: "IX_WorkoutExercise_ExerciseId");

            migrationBuilder.RenameColumn(
                name: "EquipmentID",
                table: "ExerciseEquipment",
                newName: "EquipmentId");

            migrationBuilder.RenameColumn(
                name: "ExerciseID",
                table: "ExerciseEquipment",
                newName: "ExerciseId");

            migrationBuilder.RenameIndex(
                name: "IX_ExerciseEquipment_EquipmentID",
                table: "ExerciseEquipment",
                newName: "IX_ExerciseEquipment_EquipmentId");

            migrationBuilder.InsertData(
                table: "Workout",
                columns: new[] { "ID", "CaloriesBurned", "Description", "Difficulty", "Duration", "Image", "Name", "Type" },
                values: new object[,]
                {
                    { 1, "300-400", "A complete workout targeting all major muscle groups", 1, "45 minutes", "https://example.com/full-body.jpg", "Full Body Workout", 0 },
                    { 2, "400-500", "High-intensity interval training for maximum calorie burn", 2, "30 minutes", "https://example.com/hiit.jpg", "HIIT Cardio", 1 }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_ExerciseEquipment_Equipment_EquipmentId",
                table: "ExerciseEquipment",
                column: "EquipmentId",
                principalTable: "Equipment",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ExerciseEquipment_Exercise_ExerciseId",
                table: "ExerciseEquipment",
                column: "ExerciseId",
                principalTable: "Exercise",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutExercise_Exercise_ExerciseId",
                table: "WorkoutExercise",
                column: "ExerciseId",
                principalTable: "Exercise",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutExercise_Workout_WorkoutId",
                table: "WorkoutExercise",
                column: "WorkoutId",
                principalTable: "Workout",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExerciseEquipment_Equipment_EquipmentId",
                table: "ExerciseEquipment");

            migrationBuilder.DropForeignKey(
                name: "FK_ExerciseEquipment_Exercise_ExerciseId",
                table: "ExerciseEquipment");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutExercise_Exercise_ExerciseId",
                table: "WorkoutExercise");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutExercise_Workout_WorkoutId",
                table: "WorkoutExercise");

            migrationBuilder.DeleteData(
                table: "Workout",
                keyColumn: "ID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Workout",
                keyColumn: "ID",
                keyValue: 2);

            migrationBuilder.RenameColumn(
                name: "ExerciseId",
                table: "WorkoutExercise",
                newName: "ExerciseID");

            migrationBuilder.RenameColumn(
                name: "WorkoutId",
                table: "WorkoutExercise",
                newName: "WorkoutID");

            migrationBuilder.RenameIndex(
                name: "IX_WorkoutExercise_ExerciseId",
                table: "WorkoutExercise",
                newName: "IX_WorkoutExercise_ExerciseID");

            migrationBuilder.RenameColumn(
                name: "EquipmentId",
                table: "ExerciseEquipment",
                newName: "EquipmentID");

            migrationBuilder.RenameColumn(
                name: "ExerciseId",
                table: "ExerciseEquipment",
                newName: "ExerciseID");

            migrationBuilder.RenameIndex(
                name: "IX_ExerciseEquipment_EquipmentId",
                table: "ExerciseEquipment",
                newName: "IX_ExerciseEquipment_EquipmentID");

            migrationBuilder.AddForeignKey(
                name: "FK_ExerciseEquipment_Equipment_EquipmentID",
                table: "ExerciseEquipment",
                column: "EquipmentID",
                principalTable: "Equipment",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ExerciseEquipment_Exercise_ExerciseID",
                table: "ExerciseEquipment",
                column: "ExerciseID",
                principalTable: "Exercise",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutExercise_Exercise_ExerciseID",
                table: "WorkoutExercise",
                column: "ExerciseID",
                principalTable: "Exercise",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutExercise_Workout_WorkoutID",
                table: "WorkoutExercise",
                column: "WorkoutID",
                principalTable: "Workout",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
