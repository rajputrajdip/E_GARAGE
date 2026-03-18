const userSchema = require("../models/Usermodels")
const bcrypt = require("bcrypt")
const mailSend = require("../utils/MailUtil")
const jwt = require("jsonwebtoken") 
const secret = process.env.JWT_SECRET  // Use environment variable or default secret 

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Only pick fields defined in schema
    const newUser = await userSchema.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User created successfully",
      data: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
      }
    });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
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

              const token = jwt.sign(foundUserFromEmail.toObject(), secret);


                res.status(200).json({

                  
                    message : "login successful",
                    //data : foundUserFromEmail
                    token : token,
                    role : foundUserFromEmail.role
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
        
        const { firstName } = foundUserFromEmail;
        await mailSend(email,"welcome to e-garage",` Hello ${firstName}login successful you have successfully logged in to e-garage`)
        }catch(err){
        res.status(500).json({
            message : "login failed",
            error : err
        })
    }
}

module.exports = {
    registerUser,
    loginUser

}



