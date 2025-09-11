'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Thay đổi các cột thành allowNull: true
    await queryInterface.changeColumn('Markdown', 'description', {
      type: Sequelize.TEXT('long'),
      allowNull: true,
    });

    await queryInterface.changeColumn('Markdown', 'doctorId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.changeColumn('Markdown', 'specialtyId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.changeColumn('Markdown', 'clinicId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Phục hồi lại allowNull: false nếu rollback
    await queryInterface.changeColumn('Markdown', 'description', {
      type: Sequelize.TEXT('long'),
      allowNull: false,
    });

    await queryInterface.changeColumn('Markdown', 'doctorId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn('Markdown', 'specialtyId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn('Markdown', 'clinicId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};
