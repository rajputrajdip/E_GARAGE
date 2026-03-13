const express = require("express")
const app = express()
const cors = require("cors")

//load env file
require("dotenv").config()
app.use(express.json())
app.use(cors()) //allow all requests from any origin


const DBconnection = require("./src/utils/DBconnection")
DBconnection()

const userroutes = require("./src/routes/UserRoutes")
app.use("/user",userroutes)

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`app is listen on port no. ${PORT}`)
})