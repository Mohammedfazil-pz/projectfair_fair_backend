const jwt=require('jsonwebtoken')

const jsonVerify=(req,res,next)=>{

    if(req.headers['authorization']){
        try {
            const token=req.headers['authorization'].split(' ')[1]
            const jwtResponce=jwt.verify(token,process.env.JWTSECRETKEY)
            req.userID=jwtResponce.userID
            next()
        } catch (error) {
            res.status(403).json("Please provide a valid token!")
        }
    }else{
        res.status(401).json("Please Login to Continue!")
    }



}

module.exports=jsonVerify