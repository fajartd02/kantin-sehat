'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('canteen_balance_boxes',
      [
        {
          id: 1,
          balance: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
