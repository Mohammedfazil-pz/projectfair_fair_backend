require('dotenv').config() //require dotenv and as it returns to process object

const express =require("express")
const cors=require("cors")
const router=require('./routes/routes')

require('./database/dbConnection')


//server creation

const server=express()

server.use(cors())

server.use(express.json()) //middleware

server.use('/uploads',express.static('./uploads'))

const PORT=3000 || process.env.PORT

server.use(router)


server.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})