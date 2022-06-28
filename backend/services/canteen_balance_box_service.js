const CanteenBalanceBox = require('../models/canteen_balance_box_model.js');

class CanteenBalanceBoxService {
	async addingMoneyToCanteen(id, balance) {
		const money = await CanteenBalanceBox.findOne({
			where: {
				id: id
			}
		});
		
	}

}

module.exports = new CanteenBalanceBoxService();