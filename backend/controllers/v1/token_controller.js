const TokenService = require('../../services/token_service.js');
const { errorInternal } = require('../../utils/error_message.js');

module.exports = {
	refreshToken: async(req, res) => {
		try {
			const refreshToken = req.cookies.refreshToken;
			if(!refreshToken) {
				return res.send({ status_code: 401, message: "Unauthorized"});
			}
	
			const response = await TokenService.getToken(refreshToken);
			res.json(response);
		} catch(err) {
			return res.send(errorInternal);
		}
	}
}