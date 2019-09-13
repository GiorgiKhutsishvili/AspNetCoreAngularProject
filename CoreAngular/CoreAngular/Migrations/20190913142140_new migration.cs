using Microsoft.EntityFrameworkCore.Migrations;

namespace CoreAngular.Migrations
{
    public partial class newmigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FilePath",
                table: "Photos");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FilePath",
                table: "Photos",
                maxLength: 2147483647,
                nullable: false,
                defaultValue: "");
        }
    }
}
