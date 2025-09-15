'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Xoá cột description
    await queryInterface.removeColumn('Clinic', 'description');

    // Thêm 2 cột mới
    await queryInterface.addColumn('Clinic', 'contentHTML', {
      type: Sequelize.TEXT('long'),
      allowNull: true,
    });

    await queryInterface.addColumn('Clinic', 'contentMarkdown', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Rollback: thêm lại description, xoá 2 cột mới
    await queryInterface.addColumn('Clinic', 'description', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.removeColumn('Clinic', 'contentHTML');
    await queryInterface.removeColumn('Clinic', 'contentMarkdown');
  }
};
