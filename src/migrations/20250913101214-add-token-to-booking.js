'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Thêm cột token
    await queryInterface.addColumn('Booking', 'token', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Cập nhật default cho statusId
    await queryInterface.changeColumn('Booking', 'statusId', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'S0', // S0 = pending
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Xóa cột token
    await queryInterface.removeColumn('Booking', 'token');

    // Khôi phục default statusId
    await queryInterface.changeColumn('Booking', 'statusId', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'S1', // nếu mặc định trước đây là confirmed
    });
  }
};
