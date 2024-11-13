using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitHub.AccountManagement.Migrations.PremiumUserDb
{
    /// <inheritdoc />
    public partial class FixedTypo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Premium Users_RegularUser_RegularUserID",
                table: "Premium Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Premium Users",
                table: "Premium Users");

            migrationBuilder.RenameTable(
                name: "Premium Users",
                newName: "PremiumUsers");

            migrationBuilder.RenameIndex(
                name: "IX_Premium Users_RegularUserID",
                table: "PremiumUsers",
                newName: "IX_PremiumUsers_RegularUserID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PremiumUsers",
                table: "PremiumUsers",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_PremiumUsers_RegularUser_RegularUserID",
                table: "PremiumUsers",
                column: "RegularUserID",
                principalTable: "RegularUser",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PremiumUsers_RegularUser_RegularUserID",
                table: "PremiumUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PremiumUsers",
                table: "PremiumUsers");

            migrationBuilder.RenameTable(
                name: "PremiumUsers",
                newName: "Premium Users");

            migrationBuilder.RenameIndex(
                name: "IX_PremiumUsers_RegularUserID",
                table: "Premium Users",
                newName: "IX_Premium Users_RegularUserID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Premium Users",
                table: "Premium Users",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Premium Users_RegularUser_RegularUserID",
                table: "Premium Users",
                column: "RegularUserID",
                principalTable: "RegularUser",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
