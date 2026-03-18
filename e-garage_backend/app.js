const express = require("express")
const app = express()
const cors = require("cors")

//load env file
require("dotenv").config()
app.use(express.json())
app.use(cors()) //allow all requests from any origin


const DBconnection = require("./src/utils/DBconnection")
DBconnection()

const UserRoutes = require("./src/routes/UserRoutes")
app.use("/user",UserRoutes)


// import routes
const garageOwnerRoutes = require("./src/routes/GarageOwnerRoutes");
// use routes
app.use("/garageOwner", garageOwnerRoutes);


  const AdminRoutes = require("./src/routes/AdminRoutes");

app.use("/admin", AdminRoutes);

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server is listen on port no. ${PORT}`)
})