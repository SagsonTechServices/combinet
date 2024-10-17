const { createUser, findUserByUsername, firebaseAuth, findUserById } = require("../services/authServices");
const {validatePassword} = require('../validators/authValidator')
const {genarateToken} = require('../utils/jwtUtils');

async function register(req, res) {
  const userData = req.body;
  try{
    const user = await createUser(userData);
    res.status(200).json({message: "user registered successfully", user});
  }catch(error){
    res.status(500).json({message: error.message});
  }
}

async function login(req , res){
  const {username, password, role} = req.body;
  const user = await findUserByUsername(username);
  if(user){
    if(await validatePassword(user.password, password)){
      // genarate token and send it to the frontend 
      const token = genarateToken(user);
      return res.status(200).json({message: "authenticated", token: token, user});
    }
    else{
      return res.status(400).json({message: "Incorrect password"});
    }
  }
  return res.status(400).json({message: "Invalid username"});
}

async function loginToFirebase(req , res){
  const {email , password} = req.body;
  try{
    const user = await firebaseAuth(email, password);
    return res.status(200).json({message: "Logged in to firebase", user});
  }catch(error){
    console.log(error);
    return res.status(400).json({message: "firebase login has failed"});
  }
}

async function authenticateToken(req, res){
  const userId = req.userId;
  const role = req.role;
  const user = await findUserById(userId);

  return res.status(200).json({user: user, role: role});
}

async function getById(req, res){
  const userId = req.params.id;
  try{
    const user = await findUserById(userId);
    return res.status(200).json({user});
  }catch(error){
    console.log(error);
    return res.status(500).json({message: "Could not find user"});
  }
}

module.exports = { register, login, loginToFirebase, authenticateToken, getById };
