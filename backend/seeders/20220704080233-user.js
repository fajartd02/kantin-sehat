'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('users',
			[
				{
					student_id: "45615",
					password: "$2b$10$3t9PSeGUh.4ujH3bdQcE2.rkFPMlyOG.Ir/72w5Q7EhmN6CJ4HsZK", // 123456
					refresh_token: null,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					student_id: "13307",
					password: "$2b$10$3t9PSeGUh.4ujH3bdQcE2.rkFPMlyOG.Ir/72w5Q7EhmN6CJ4HsZK", // 123456
					refresh_token: null,
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