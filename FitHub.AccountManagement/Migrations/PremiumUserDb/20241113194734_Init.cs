using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitHub.AccountManagement.Migrations.PremiumUserDb
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.CreateTable(
            //    name: "RegularUser",
            //    columns: table => new
            //    {
            //        ID = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        Weight = table.Column<double>(type: "float", nullable: false),
            //        Height = table.Column<double>(type: "float", nullable: false),
            //        DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
            //        Type = table.Column<int>(type: "int", nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_RegularUser", x => x.ID);
            //    });

            migrationBuilder.CreateTable(
                name: "PremiumUser",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegularUserID = table.Column<int>(type: "int", nullable: false),
                    SubscriptionStartDate = table.Column<DateTime>(type: "date", nullable: false),
                    SubscriptionEndDate = table.Column<DateTime>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PremiumUser", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PremiumUser_RegularUser_RegularUserID",
                        column: x => x.RegularUserID,
                        principalTable: "RegularUser",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PremiumUser_RegularUserID",
                table: "PremiumUser",
                column: "RegularUserID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PremiumUser");

            //migrationBuilder.DropTable(
            //    name: "RegularUser");
        }
    }
}
