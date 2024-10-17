const dotenv = require('dotenv');
dotenv.config();

const authConfig = {
    "jwtSecret": process.env.JWTSECRET,
    "tokenExpiry": '1h'
};

module.exports = authConfig;