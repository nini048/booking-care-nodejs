"use strict";

/** @type {import('sequelize-cli').Migration} */
"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    // Xóa cột roleId
    await queryInterface.removeColumn("Users", "keyRole");
    await queryInterface.removeColumn("Users", "typeRole");

    // Thêm cột keyRole
    await queryInterface.addColumn("Users", "phoneNumber", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("Users", "image", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("Users", "roleId", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Users", "positionId", {
      type: Sequelize.STRING,
      allowNull: true,
    });

  },

  async down(queryInterface, Sequelize) {
    // Rollback: xóa 2 cột vừa thêm
    await queryInterface.removeColumn("Users", "phoneNumber");
    await queryInterface.removeColumn("Users", "image");
    await queryInterface.removeColumn("Users", "roleId");
    await queryInterface.removeColumn("Users", "positionId");

    // Thêm lại cột roleId
    await queryInterface.addColumn("Users", "keyRole", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("Users", "typeRole", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
