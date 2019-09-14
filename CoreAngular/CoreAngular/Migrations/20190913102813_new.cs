using Microsoft.EntityFrameworkCore.Migrations;

namespace AspNetCoreAngular.Migrations
{
    public partial class @new : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_Vehicles_VehicleId",
                table: "Photos");

            migrationBuilder.AlterColumn<int>(
                name: "VehicleId",
                table: "Photos",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FilePath",
                table: "Photos",
                maxLength: 2147483647,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_Vehicles_VehicleId",
                table: "Photos",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_Vehicles_VehicleId",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "FilePath",
                table: "Photos");

            migrationBuilder.AlterColumn<int>(
                name: "VehicleId",
                table: "Photos",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_Vehicles_VehicleId",
                table: "Photos",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
