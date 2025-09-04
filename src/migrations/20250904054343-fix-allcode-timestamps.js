"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Sửa cột createdAt
    await queryInterface.changeColumn("Allcode", "createdAt", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });

    // Sửa cột updatedAt
    await queryInterface.changeColumn("Allcode", "updatedAt", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
    });
  },

  async down(queryInterface, Sequelize) {
    // Rollback về trạng thái cũ (nếu cần)
    await queryInterface.changeColumn("Allcode", "createdAt", {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.changeColumn("Allcode", "updatedAt", {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
