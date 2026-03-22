// const jwt = require("jsonwebtoken")
// const secret = "secret"

// const validateToken = async(req,res,next)=>{

//     try{

//         const token = req.headers.authorization
//         console.log(token)
//         if(token){
//             //token Bearer
//             if(token.startsWith("Bearer ")){

//                 //remove Bearer from token

//                 const tokenValue = token.split(" ")[1]
//                 //verifytoken using jwt
//                 const decodedData = jwt.verify(tokenValue,secret)
//                 console.log(decodedData)
//                 next()


//             }else{
//                 res.status(401).json({
//                     message:"token is not Bearer token"
//                 })
//             }

//         }
//         else{
//             res.status(401).json({
//                 message:"token is not present.."
//             })
//         }
        


//     }catch(err){
//         console.log(err)
//         res.status(500).json({
//             message:"error while validating token",
//             err:err
//         })
//     }
// }
// module.exports = validateToken




const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "secret123";

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Token is not present" });
    }

    if (!token.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token is not Bearer token" });
    }

    const tokenValue = token.split(" ")[1];
    const decodedData = jwt.verify(tokenValue, secret);

    // ✅ Attach decoded token data to req.user
    req.user = decodedData;

    next();
  } catch (err) {
    console.error("Token validation error:", err);
    res.status(500).json({ message: "Error while validating token", err });
  }
};

module.exports = validateToken;