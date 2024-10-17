const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');

function genarateToken(user){
    const secretKey = authConfig.jwtSecret;
    const expiry = authConfig.tokenExpiry;
    const userId = user._id;
    const role = user.role;

    const token = jwt.sign({userId: userId, role: role}, secretKey, {expiresIn: expiry});

    return token;
}

function validateToken(token){
    return jwt.verify(token, authConfig.jwtSecret);
}

module.exports = {genarateToken, validateToken};