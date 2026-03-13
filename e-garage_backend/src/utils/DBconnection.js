const mongoose = require("mongoose")


const DBconnectiion = ()=>{
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("database connected")
    }).catch((err)=>{
        conaole.log(err)
    })
}
module.exports = DBconnectiion