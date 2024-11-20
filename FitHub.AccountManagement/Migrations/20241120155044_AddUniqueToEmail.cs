using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitHub.AccountManagement.Migrations
{
    /// <inheritdoc />
    public partial class AddUniqueToEmail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_RegularUser_Email",
                table: "RegularUser",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_RegularUser_Email",
                table: "RegularUser");
        }
    }
}
