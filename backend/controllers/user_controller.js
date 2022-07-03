const UserService = require('../services/user.service.js');
const { errorInternal } = require('../utils/error_message');

module.exports = {
  register: async(req, res) => {
    const { student_id, password } = req.body;
    try {
      const response = await UserService.register(student_id, password);
      return res.json(response);
    } catch(err) {
      return res.send(errorInternal);
    }
  }
};