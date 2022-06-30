const CanteenBalanceBoxService = require("../../services/canteen_balance_box_service");
const id = 1; // just 1 wallet

module.exports = {
  addBalance: async(req, res) => {
    const { balance } = req.body;
    try {
      const response = await CanteenBalanceBoxService.addingMoneyToCanteen(id, balance);
      res.json(response);
    } catch(err) {
      return res.send({
        message: "Error internal",
        status_code: "500"
      });
    }
  },

  getBalance: async(req, res) => {
    try {
      const response = await CanteenBalanceBoxService.getMoneyFromCanteen(id);
      res.json(response);
    } catch(err) {
      return res.send({
        message: "Error internal",
        status_code: "500"
      });
    }
  }
};