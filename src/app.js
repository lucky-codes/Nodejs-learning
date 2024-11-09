const express = require("express");
const app = express();
const{middlewareUserAuth}=require("./middleware/auth")
const connectDB =require('./config/database')
const User = require("./Models/user")
// creating the instance of User model
app.use(express.json());

app.post("/signup", async(req, res)=>{
  
  // const obj = {
  //   firstName : "ms",lastName : "dhoni",email : "msdhoni@gmail.com", password : "diajsojdoaj", age : "45"
  // }
  const newUser = new User(req.body)
  try{
    await newUser.save();
    res.send("request has been sent successfully")
  }
  catch(error){
    console.log("Error encountered: ", error)
  }
   
});
//Get user by Email
app.get('/user', async(req,res)=>{
  try{
    const userData = await User.find({})
    if(userData===0){
      res.status(404).send("Users Data not Found")
    }
    else{
      res.send(userData)
    }
    
  }
  catch(error){
    res.status(500).send("Error encountered")
  }
  
})
app.delete("/userDelete", async(req, res)=>{
  const userId=  req.body.userId;
  try{
    const user = await User.findByIdAndDelete(userId)
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send("User delete successfully")
  }
  catch(error){
    res.status(500).send("Error encountered")
  }

})
app.get("/oneUser",async(req, res)=>{
  const userEmail = req.body.email
  console.log(userEmail)
  try{
  const aUser = await User.findOne({email: userEmail})
  if(!aUser){
    res.status(404).send("User not Found")
  }
  else{
    res.send(aUser)
  }
  
}
catch(error){
  res.status(500).send("Error encountered")
}
})
app.patch("/update",async(req, res)=>{
  const data = req.body;
  const userId = req.body.userId;
  try{
    await User.findByIdAndUpdate(userId,data)
    res.send("User updated successfully")

  }
  catch(error){
    res.status(400).send("Something went wrong")
  }
})
connectDB().then(()=>{
  app.listen(7777,(req, res)=>{
    console.log("Connection is Established at port:7777......")
 })
  console.log("Database Connections has been Establized....")
}).catch((error)=>{
  console.error("Error Found database not connected")
})
