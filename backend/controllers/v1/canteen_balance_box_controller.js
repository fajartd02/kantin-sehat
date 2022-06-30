const CanteenBalanceBoxService = require("../../services/canteen_balance_box_service");
const { errorInternal } = require("../../utils/error_message");
const id = 1; // just 1 wallet

module.exports = {
  addBalance: async(req, res) => {
    const { balance } = req.body;
    try {
      const response = await CanteenBalanceBoxService.addingMoneyToCanteen(id, balance);
      res.json(response);
    } catch(err) {
      return res.send(errorInternal);
    }
  },

  getBalance: async(req, res) => {
    try {
      const response = await CanteenBalanceBoxService.getMoneyFromCanteen(id);
      res.json(response);
    } catch(err) {
      return res.send(errorInternal);
    }
  }
};