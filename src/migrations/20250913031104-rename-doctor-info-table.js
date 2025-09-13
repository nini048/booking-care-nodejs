"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Đổi tên bảng từ Doctor_Info sang DoctorInfo
    await queryInterface.renameTable("Doctor_Info", "DoctorInfo");
  },

  async down(queryInterface, Sequelize) {
    // Nếu rollback thì đổi lại từ DoctorInfo -> Doctor_Info
    await queryInterface.renameTable("DoctorInfo", "Doctor_Info");
  },
};
