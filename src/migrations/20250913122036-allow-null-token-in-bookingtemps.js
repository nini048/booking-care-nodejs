'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('BookingTemps', 'token', {
      type: Sequelize.STRING,
      allowNull: true, // cho phép null
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('BookingTemps', 'token', {
      type: Sequelize.STRING,
      allowNull: false, // rollback
    });
  }
};
