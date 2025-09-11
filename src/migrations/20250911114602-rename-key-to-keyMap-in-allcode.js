'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Allcode', 'key', 'keyMap');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Allcode', 'keyMap', 'key');
  }
};
