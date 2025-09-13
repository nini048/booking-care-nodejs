'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('BookingTemps', 'patientId', {
      type: Sequelize.INTEGER,
      allowNull: false, // nếu muốn bắt buộc
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('BookingTemps', 'patientId');
  }
};
