'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'gender', {
      type: Sequelize.STRING,
      allowNull: true, // hoặc false tuỳ requirement
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'gender', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
  }
};
