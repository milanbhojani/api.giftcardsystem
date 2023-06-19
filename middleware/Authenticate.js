const User = require('../models/User')
const jwt = require('jsonwebtoken')


const Authenticate = async(req,res,next) => {
    try {
        const token = req.headers.authorization;
        
        console.log(token);
        const verifyToken = jwt.verify(token,process.env.SECRET_KEY)

        const rootUser = await User.findOne({_id:verifyToken._id,tokens:token})

        if(!rootUser){
            throw new Error("User not found ")
        }

        req.token= token
        req.rootUser= rootUser
        req.userId=rootUser.userId
        next();
        
    } catch (error) {
        res.status(401).send("Unauthorized access")
        console.log(error)
    }
}

module.exports= Authenticate
