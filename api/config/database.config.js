const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectToDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to the database.");
    }catch(error){
        console.log("Connection with the database has failed.");
        console.log(`Error log:\n${error}`);
    }
}

module.exports = {connectToDB};