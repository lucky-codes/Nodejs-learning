const express = require("express");
const app = express();
const { middlewareUserAuth } = require("./middleware/auth");
const connectDB = require("./config/database");
const User = require("./Models/user");
const {validateSignUpData} = require("./utils/validation")
const bcrypt = require("bcrypt")
const validator =  require("validator")
 // creating the instance of User model
app.use(express.json());

app.post("/signup", async (req, res) => {
  
  try {
  //validation of data
  validateSignUpData(req)
  //Encrypt the password
  const {firstName,lastName,email,password} = req.body
  const passwordHash =await bcrypt.hash(password, 10)
    const newUser = new User({
      firstName,
      lastName,
      email,
      password : passwordHash
    });
    await newUser.save();
    res.send("request has been sent successfully");
  } catch (error) {
    res.status(500).send("Something went Wrong Error-Log :" + error.message);
  }
});
//Get user by Email
app.get("/user", async (req, res) => {
  try {
    const userData = await User.find({});
    if (userData === 0) {
      res.status(404).send("Users Data not Found");
    } else {
      res.send(userData);
    }
  } catch (error) {
    res.status(500).send("Error encountered");
  }
});
app.delete("/userDelete", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send("User delete successfully");
  } catch (error) {
    res.status(500).send("Error encountered");
  }
});
app.get("/oneUser", async (req, res) => {
  const userEmail = req.body.email;
  console.log(userEmail);
  try {
    const aUser = await User.findOne({ email: userEmail });
    if (!aUser) {
      res.status(404).send("User not Found");
    } else {
      res.send(aUser);
    }
  } catch (error) {
    res.status(500).send("Error encountered");
  }
});
app.patch("/update", async (req, res) => {
  const data = req.body;
  const userId = req.body.userId;
  try {
    const allowedupdates = [
      "userId",
      "firstName",
      "lastName",
      "password",
      "age",
      "gender",
      "photoUrl",
      "about",
      "skills",
    ];
    const check = Object.keys(data).every((k) => allowedupdates.includes(k));
    if (!check) {
      throw new Error("Data field is not valid to update");
    }
    if (data.skills.length > 10) {
      throw new Error("You can not add more than 10 fields");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send("User updated successfully");
    }
  } catch (error) {
    res.status(400).send("Update failed :" + error.message);
  }
});
app.post('/login',async (req, res)=>{
try{
  const{email, password} = req.body
  if(!validator.isEmail(email)){
    throw new Error("Invalid Credential")
  }
  const user =await User.findOne({email:email});
  if(!user){
    res.status(404).send("User not found")
  }

    const isPasswordValid = await bcrypt.compare(password, user.password)
  if(isPasswordValid){
    res.send("User logged in succesfully")
  }
  else{
    throw new Error("Invalid Credential")
  }
    

}
catch(error){
res.status(500).send("Error:"+error)
}
})
connectDB()
  .then(() => {
    app.listen(7777, (req, res) => {
      console.log("Connection is Established at port:7777......");
    });
    console.log("Database Connections has been Establized....");
  })
  .catch((error) => {
    console.error("Error Found database not connected");
  });
