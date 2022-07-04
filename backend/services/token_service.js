const { User } = require('../models');
const jwt = require('jsonwebtoken');

class TokenService {
	async getToken(refreshToken) {
		const user = await User.findOne({
			where: {
				refresh_token: refreshToken
			}
		});

		if (!user) {
			return forbiddenAccount;
		}
		
		return new Promise((resolve, reject) => {
			jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN, (err, decoded) => {
				if (err) {
					reject(forbiddenAccount);
				}
	
				const userId = user.student_id;
				const accessToken = jwt.sign({ userId }, process.env.SECRET_ACCESS_TOKEN, {
					expiresIn: '60s'
				});
				
				resolve(successGetToken(accessToken));
			});
		});
	}
}

const successGetToken = (accessToken) => {
	return {
		meta: {
			message_developer: "OK!",
			status_code: 200
		},
		response: {
			accessToken
		}
	}
}

const forbiddenAccount = {
	meta: {
		message_developer: "Forbidden!",
		status_code: 403
	},
	response: null
}

module.exports = new TokenService();