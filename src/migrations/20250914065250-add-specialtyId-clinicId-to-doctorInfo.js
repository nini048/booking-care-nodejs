"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("DoctorInfo", "specialtyId", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("DoctorInfo", "clinicId", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("DoctorInfo", "specialtyId");
    await queryInterface.removeColumn("DoctorInfo", "clinicId");
  },
};
