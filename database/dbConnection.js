const mongoose=require('mongoose')
const connectionString=process.env.MONGODBCONNECTIONSTRING

mongoose.connect(connectionString).then(()=>console.log("Successfully Connected with MongoDB Atlas")).catch((err)=>console.log("MongoDB Connection failed",err))