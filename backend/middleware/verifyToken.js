const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	
	if (token == null) {
		return res.send({ status_code: 401, message: "Unauthorized" });
	}

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) {
			return res.send({ status_code: 403, message: "Forbidden" });
		}
		req.email = decoded.email;
		next();
	});
}

module.exports = {
	verifyToken
}