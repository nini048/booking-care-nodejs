"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Xóa cột description
    await queryInterface.removeColumn("Specialty", "description");

    // Thêm 2 cột mới
    await queryInterface.addColumn("Specialty", "contentHTML", {
      type: Sequelize.TEXT("long"),
      allowNull: true,
    });

    await queryInterface.addColumn("Specialty", "contentMarkdown", {
      type: Sequelize.TEXT("long"),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Rollback
    await queryInterface.addColumn("Specialty", "description", {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.removeColumn("Specialty", "contentHTML");
    await queryInterface.removeColumn("Specialty", "contentMarkdown");
  },
};
