'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products',
      [
        {
          student_id: "45615",
          product_name: "T-shirt T-rex",
          product_image: "/assets/img/2.jpg",
          description: "Terbuat dari bahan lateks yang sangat lembut",
          price: 50000,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          student_id: "45615",
          product_name: "T-shirt Polo",
          product_image: "/assets/img/1.jpg",
          description: "Terbuat dari bahan katun yang sangat lembut",
          price: 30000,
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
