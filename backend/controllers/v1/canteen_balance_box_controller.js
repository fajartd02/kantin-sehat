const CanteenBalanceBoxService = require("../../services/canteen_balance_box_service");

module.exports = {
  addBalance: async (req, res) => {
    const { balance } = req.body;
    const id = 1; // only one canteen
    try {
      const response = await CanteenBalanceBoxService.addingMoneyToCanteen(id, balance);
      res.json(response);
    } catch (err) {
      return res.send({
        message: "Error internal",
        status_code: "500"
      });
    }
  }
};