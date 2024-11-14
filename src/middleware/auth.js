const jwt = require("jsonwebtoken")
const Usermodel = require("../Models/user")
const userAuth= async(req, res, next)=>{
//read the token from the request cookies 
try{
const {token} = req.cookies
if(!token){
    throw new Error("Token is not valid!.....")
}
const secret = "SECRETTOKEN@1823u1297&"
//validate the token 
const decodeObj = jwt.verify(token,secret)
//find the user
const {_id} = decodeObj
const user = await Usermodel.findById(_id)
if(!user){
    throw new Error("User not found")
}
req.user = user
next();
}

catch(error){
 res.status(400).send("Error:"+ error.message)
}
}
module.exports ={
    userAuth
}