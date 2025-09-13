'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Đổi P0 từ "None" → "Doctor"
    await queryInterface.bulkUpdate(
      'Allcode',
      { valueEn: 'Doctor' },
      { keyMap: 'P0', type: 'POSITION' }
    );

    // Đổi P2 từ "Doctor" → "PhD"
    await queryInterface.bulkUpdate(
      'Allcode',
      { valueEn: 'PhD' },
      { keyMap: 'P2', type: 'POSITION' }
    );
  },

  async down(queryInterface, Sequelize) {
    // Rollback P0 về "None"
    await queryInterface.bulkUpdate(
      'Allcode',
      { valueEn: 'None' },
      { keyMap: 'P0', type: 'POSITION' }
    );

    // Rollback P2 về "Doctor"
    await queryInterface.bulkUpdate(
      'Allcode',
      { valueEn: 'Doctor' },
      { keyMap: 'P2', type: 'POSITION' }
    );
  }
};
