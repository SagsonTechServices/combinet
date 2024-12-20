const {validateToken} = require('../utils/jwtUtils');

function authMiddleware(req , res , next){
    const token = req.header("Authorization").replace("Bearer ", "");
    if(!token){
        return res.status(400).json({message: "Access denied. No token provided"});
    }
    try{
        const decoded = validateToken(token);

        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    }catch(error){
        return res.status(401).json({message: "Invalid token"});
    }
}

module.exports = authMiddleware;