const { CanteenBalanceBox } = require('../models');

class CanteenBalanceBoxService {
	async addingMoneyToCanteen(id, newBalance) {
		const canteen = await CanteenBalanceBox.findOne({ where: { id } });

		if (canteen == null) {
			await CanteenBalanceBox.create({ balance: 0 });
			canteen = await CanteenBalanceBox.findOne({ where: { id } });
		}

		let { balance } = canteen;
		let totalBalance = balance + newBalance;

		await CanteenBalanceBox.update({ balance: totalBalance }, { where: { id } });

		return {
			message_developer: "Successfully added balance",
			status_code: 400,
			before_added_balance: balance,
			added_balance: newBalance,
			after_added_balance: totalBalance
		}
	}
}

module.exports = new CanteenBalanceBoxService();