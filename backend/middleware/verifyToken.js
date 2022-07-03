import jwt from "jsonwebtoken";

const verifyToken = async(req, res, next) => {
    const authHeader = req.headers['authorization']; // ini adalah access token
    const token = authHeader && authHeader.split(' ')[1]; // ambil JWT, buang bearer
    console.log("authH > " + authHeader);
    console.log("Token > " + token);

    if(token == null) {
        return res.sendStatus(401); // unauthorized
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) {
            return res.sendStatus(403); //forbidden
        } 
        req.email = decoded.email;
        next();
    });
}

module.exports = {
	verifyToken
}