'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Booking', 'date', {
      type: Sequelize.DATEONLY,
      allowNull: false, // giữ nguyên constraint nếu cần
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Booking', 'date', {
      type: Sequelize.DATE,  // revert về kiểu cũ
      allowNull: false,
    });
  }
};
