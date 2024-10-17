const bcryptjs = require('bcryptjs');
const User = require('../models/User');

async function validatePassword(userPassword, password){
    console.log(password);
    return await bcryptjs.compare(password, userPassword);
}

module.exports = {validatePassword};