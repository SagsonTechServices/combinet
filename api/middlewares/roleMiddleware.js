function roleMiddleware(req , res , next){
    const role = req.role;
    if(role !== 'admin'){
        return res.status(403).json({message: "Unauthorized access"});
    }
    next();
}

module.exports = roleMiddleware;