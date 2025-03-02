const jwt= require('jsonwebtoken')
const User=  require("../models/userModel")
const authenticateUser=async (req,res,next)=>{

    const token= req.cookies.token ||req.headers['authorization']?.split(' ')[1]
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
      }
    
    console.log("Token:", token);
    try {
        const decoded= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const foundUser= await User.findById(decoded.userId)
       
        
        req.user=foundUser;
        next()
    } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
}
module.exports=authenticateUser;