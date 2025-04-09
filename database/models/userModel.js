const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gitlink:{
        type:String
    },
    linkedinlink:{
        type:String
    },
    profileimage:{
        type:String
    }
})

const users=mongoose.model("users",userSchema)

module.exports =users