const userSchema = require("../models/Usermodels")
const bcrypt = require("bcrypt")
const mailSend = require("../utils/MailUtil")



const registeruser = async(req,res)=>{
    try{

        const hashedPassword = await bcrypt.hash(req.body.password,10)
        req.body.password = hashedPassword
    const saveuser = await userSchema.create({...req.body,password:hashedPassword})
    res.status(201).json({
        message : "user saved",
        data : saveuser
    })
    }
    catch(err){
        res.status(500).json({
            message : "user not saved",
            error : err
        })
    }
}
const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body
                                                //modelcolumnname:req.body.email
        const foundUserFromEmail = await userSchema.findOne({email:email})
        //console.log(foundUserFromEmail)
        if(foundUserFromEmail){
            //compare the password
            const isPasswordMatch = await bcrypt.compare(password,foundUserFromEmail.password)
            if(isPasswordMatch){
                res.status(200).json({
                    message : "login successful",
                    data : foundUserFromEmail
                })
            }else{
                res.status(401).json({
                    message : "invalid credentials"
                })
            }
        }else{
            res.status(404).json({
                message : "user not found"
            })
        }     
        
        await mailSend(email,"welcome to e-garage",` Hello ${firstName}login successful you have successfully logged in to e-garage`)
        }catch(err){
        res.status(500).json({
            mesasge : "login failed",
            error : err
        })
    }
}

module.exports = {
    registeruser,
    loginUser

}