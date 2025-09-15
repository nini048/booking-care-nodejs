'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Xóa cột addressClinic
    await queryInterface.removeColumn('DoctorInfo', 'addressClinic');
  },

  async down(queryInterface, Sequelize) {
    // Nếu rollback, thêm lại cột addressClinic
    await queryInterface.addColumn('DoctorInfo', 'addressClinic', {
      type: Sequelize.STRING,
      allowNull: true, // hoặc false tuỳ trước đó
    });
  }
};
