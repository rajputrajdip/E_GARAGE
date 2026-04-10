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

const secret = process.env.JWT_SECRET   //|| "secret";

const validateToken = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    // ❌ No token
    if (!header) {
      return res.status(401).json({ message: "No token provided" });
    }

    // ❌ Not Bearer format
    if (!header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // ✅ Extract token
    const token = header.split(" ")[1];

    // ❌ Empty token
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, secret);

    // ✅ Attach user data
    req.user = decoded;

    next();
  } catch (err) {
    console.error("Auth Error:", err.message);

    // ❌ Token expired
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    // ❌ Invalid token
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = validateToken;