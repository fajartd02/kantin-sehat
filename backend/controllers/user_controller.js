const { errorInternal } = require("../utils/error_message");

module.exports = {
  register: async(req, res) => {
    const { student_id, password } = req.body;
    try {

    } catch(err) {
      return res.send(errorInternal);
    }
  }
};