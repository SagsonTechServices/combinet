const User = require('../models/User');
const {hashPassword} = require('../utils/hashUtils');
const {auth} = require('../config/firebase.config');
const {signInWithEmailAndPassword} = require('firebase/auth');

async function findUserByUsername(username){
    const user = await User.findOne({'username': username});
    return user;
}

async function findUserByEmail(email){
    const user = await User.findOne({'email': email});
    return user;
}

async function validateUser(user){
    const {username, email} = user;

    if(await findUserByUsername(username)){throw new Error('This username has been already taken.')}
    else if(await findUserByEmail(email)){throw new Error('The email id is already in use.')}
    else{return null}
}

async function createUser(userData){
    const {username, password, email, role} = userData;
    
    try{
        await validateUser({username, email});
    }catch(error){
        throw error;
    }

    const hashedPassword = await hashPassword(password);

    try{
        const user = await User.create(
            {
                username: username,
                password: hashedPassword,
                email: email,
                role: role
            }
        )
    
        return user;
    }catch(error){
        throw error;
    }
}

async function firebaseAuth(email , password){
    try{
        const userCredentials = await signInWithEmailAndPassword(auth , email, password);
        const user = userCredentials.user;

        return user;
    }catch(error){
        throw error;
    }
}

async function findUserById(userId){
    try{
        const user = await User.findById(userId);
        return user;
    }catch(error){
        throw error;
    }
}
module.exports = {createUser, findUserByUsername, firebaseAuth, findUserByUsername, findUserByEmail, findUserById};