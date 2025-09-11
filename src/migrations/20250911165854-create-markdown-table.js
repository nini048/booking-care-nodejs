'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Markdown', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contentHTML: {
        type: Sequelize.TEXT('long'),
        allowNull: false,
      },
      contentMarkdown: {
        type: Sequelize.TEXT('long'),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT('long'),
        allowNull: true,   // cho phép null
      },
      doctorId: {
        type: Sequelize.INTEGER,
        allowNull: true,   // cho phép null
      },
      specialtyId: {
        type: Sequelize.INTEGER,
        allowNull: true,   // cho phép null
      },
      clinicId: {
        type: Sequelize.INTEGER,
        allowNull: true,   // cho phép null
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Markdown');
  }
};
