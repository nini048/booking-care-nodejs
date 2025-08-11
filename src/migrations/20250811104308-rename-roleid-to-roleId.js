"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Users", "roleid", "roleId");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Users", "roleId", "roleid");
  },
};
