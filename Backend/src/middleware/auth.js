const jwt = require("jsonwebtoken");
const Usermodel = require("../Models/user");

// const userAuth = async (req, res, next) => {
//   //read the token from the request cookies
//   try {
//     const { token } = req.cookies;
//     console.log(token)
//     if (!token) {
//       throw new Error("Token is not valid!.....");
//     }
//     const secret = process.env.SECRET_KEY;
//     //validate the token
//     const decodeObj = jwt.verify(token, secret);
//     //find the user
//     const { _id } = decodeObj;
//     const user = await Usermodel.findById(_id);
//     if (!user) {
//       throw new Error("User not found");
//     }
//     req.user = user;
//     // console.log(req.user)
//     next();
//   } catch (error) {
//     res.status(400).send("Error:" + error.message);
//   }
// };



const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if(!authHeader){
      throw new Error('Invalid token')
    }
    console.log(authHeader);
    const token = authHeader.split(' ')[1].trim();

    if (!token) {
      throw new Error("Token is not valid!.....");
    }
    const secret = process.env.SECRET_KEY;
    //validate the token
    const decodeObj = jwt.verify(token, secret);
    //find the user
    const { _id } = decodeObj;
    const user = await Usermodel.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    // console.log(req.user)
    next();



  } catch (error) {
    console.error('Error in auth middleware', error)
  }
}

module.exports = {
  authMiddleware
};
