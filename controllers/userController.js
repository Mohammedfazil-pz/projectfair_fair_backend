const users=require('../database/models/userModel')
const jwt=require('jsonwebtoken')

exports.registerController=async(req,res)=>{
    const {username,email,password}=req.body;
    try {
        const isUserAlreadyExists=await users.findOne({email})
        if(isUserAlreadyExists){
            res.status(409).json("UserAlready Exists!")
        }else{
            const newUser=new users({username,email,password})
            await newUser.save()
            res.status(201).json(newUser)
        }
    } catch (error) {
        res.status(500).json({error:error})
    }
}


exports.loginController=async(req,res)=>{
    const {email,password}=req.body
    try {
        const existingUser=await users.findOne({email,password})
        if(existingUser){
            const token=jwt.sign({userID:existingUser._id},process.env.JWTSECRETKEY)
            res.status(200).json({user:existingUser,token:token})
        }else{
            res.status(401).json({message:"Invalid username/password"})
        }
    } catch (error) {
        res.status(500).json({error:error})
    }
}

exports.editProfile=async(req,res)=>{
    const _id=req.userID
    const {gitlink,linkedinlink,profileimage}=req.body

    const updateimage=req.file?req.file.filename:profileimage

    try {
        const isUserAlreadyExists=await users.findByIdAndUpdate({_id},{gitlink,linkedinlink,profileimage:updateimage},{new:true})
        res.status(200).json(isUserAlreadyExists)
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}

exports.getProfileDetails=async(req,res)=>{
    const userID=req.userID
    try {
        const isUserAlreadyExists=await users.findById(userID)
        const {gitlink,linkedinlink,profileimage}=isUserAlreadyExists
        res.status(200).json({gitlink,linkedinlink,profileimage})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}