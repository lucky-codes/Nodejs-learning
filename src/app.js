const express = require("express");
const connectDB = require("./config/database");
const userModel = require("./Models/user");
const cookieparser = require("cookie-parser");
const { userAuth } = require("./middleware/auth.js");
const app = express();  
// creating the instance of User model
const authRouter = require('./routes/authRouter.js')
const profileouter=require('./routes/profileRouter.js')
const requestRouter = require('./routes/requestRouter.js')
const userRequestRoute = require('./routes/userRequestRouter.js')
app.use(express.json());
app.use(cookieparser());
app.use('/',authRouter)
app.use('/',profileouter)
app.use('/',requestRouter)
app.use('/', userRequestRoute)
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

app.get('/health-check', (req, res) => {
  res.status(200).json({message: "Server is healthy"})
})
