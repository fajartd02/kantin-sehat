const UserService = require('../services/user.service.js');
const { errorInternal } = require('../utils/error_message');

module.exports = {
  register: async (req, res) => {
    const { student_id, password } = req.body;
    try {
      const response = await UserService.register(student_id, password);
      return res.json(response);
    } catch (err) {
      return res.send(errorInternal);
    }
  },
  login: async (req, res) => {
    const { student_id, password } = req.body;
    try {
      const response = await UserService.login(student_id, password);

      res.cookie('refreshToken', response.refresh_token, {
        httpOnly: true, // this mean can't access by client
        maxAge: 24 * 60 * 60 * 1000 // this mean 1 day
      });

      return res.json(response);
    } catch (err) {
      return res.send(errorInternal);
    }
  },
  logout: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.send({ status_code: 204, message_developer: "no content" });
    }

    await UserService.logout(refreshToken);
    res.clearCookie('refreshToken');

    return res.send({ status_code: 200, message: "OK", message_developer: "Berhasil Logout!" });
  }
};