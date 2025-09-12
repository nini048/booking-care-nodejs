'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Schedule', 'date', {
      type: Sequelize.DATEONLY,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Schedule', 'date', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
