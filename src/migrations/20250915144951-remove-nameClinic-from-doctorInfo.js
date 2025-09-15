"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("DoctorInfo", "nameClinic");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("DoctorInfo", "nameClinic", {
      type: Sequelize.STRING,
    });
  },
};
