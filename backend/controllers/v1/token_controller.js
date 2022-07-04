const TokenService = require('../../services/token_service.js');

const refreshToken = async(req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) {
			return res.send({ status_code: 401, message: "Unauthorized"});
        }

		const response = await TokenService.getToken(refreshToken);
		res.json(response);
	} catch(err) {
		console.log(err);
	}
}

module.exports = {
	refreshToken
}