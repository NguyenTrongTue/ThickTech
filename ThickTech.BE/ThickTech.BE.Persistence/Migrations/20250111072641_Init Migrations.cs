using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ThickTech.BE.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitMigrations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_club_details_clubs_club_id",
                table: "club_details");

            migrationBuilder.RenameColumn(
                name: "club_id",
                table: "club_details",
                newName: "master_id");

            migrationBuilder.RenameIndex(
                name: "IX_club_details_club_id",
                table: "club_details",
                newName: "IX_club_details_master_id");

            migrationBuilder.AddForeignKey(
                name: "FK_club_details_clubs_master_id",
                table: "club_details",
                column: "master_id",
                principalTable: "clubs",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_club_details_clubs_master_id",
                table: "club_details");

            migrationBuilder.RenameColumn(
                name: "master_id",
                table: "club_details",
                newName: "club_id");

            migrationBuilder.RenameIndex(
                name: "IX_club_details_master_id",
                table: "club_details",
                newName: "IX_club_details_club_id");

            migrationBuilder.AddForeignKey(
                name: "FK_club_details_clubs_club_id",
                table: "club_details",
                column: "club_id",
                principalTable: "clubs",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
