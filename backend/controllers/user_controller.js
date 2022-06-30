const { errorInternal } = require('../utils/error_message');
const UserService = require('../services/user.service.js');

module.exports = {
  register: async(req, res) => {
    const { student_id, password } = req.body;
    try {
      UserService.register(student_id, password);
    } catch(err) {
      return res.send(errorInternal);
    }
  }
};