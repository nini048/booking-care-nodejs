"use strict";

/** @type {import('sequelize-cli').Migration} */
"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    // Xóa cột roleId
    await queryInterface.removeColumn("Users", "roleId");

    // Thêm cột keyRole
    await queryInterface.addColumn("Users", "keyRole", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Thêm cột typeRole
    await queryInterface.addColumn("Users", "typeRole", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Rollback: xóa 2 cột vừa thêm
    await queryInterface.removeColumn("Users", "keyRole");
    await queryInterface.removeColumn("Users", "typeRole");

    // Thêm lại cột roleId
    await queryInterface.addColumn("Users", "roleId", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
