using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitHub.AccountManagement.Migrations
{
    /// <inheritdoc />
    public partial class AddedColumnsForRegularUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfBirth",
                table: "Regular Users",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<double>(
                name: "Height",
                table: "Regular Users",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Weight",
                table: "Regular Users",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                table: "Regular Users");

            migrationBuilder.DropColumn(
                name: "Height",
                table: "Regular Users");

            migrationBuilder.DropColumn(
                name: "Weight",
                table: "Regular Users");
        }
    }
}
