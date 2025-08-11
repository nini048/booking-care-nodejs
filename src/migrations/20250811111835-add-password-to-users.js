'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: true, 
      defaultValue: null
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'password');
  }
};


