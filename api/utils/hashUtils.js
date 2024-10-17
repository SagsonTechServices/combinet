const bcryptjs = require('bcryptjs');

async function hashPassword(password){
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
}

module.exports = {hashPassword};