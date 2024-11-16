const express = require("express");
const connectDB = require("./config/database.js");
const userModel = require("./Models/user.js");
const cookieparser = require("cookie-parser");
const { userAuth } = require("./middleware/auth.js");
const cors = require('cors')
const app = express();  
require('dotenv').config()
app.use(cors({
  origin: 'http://localhost:5173',
  allowedHeaders:'Content-Type'
}))
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
    app.listen(process.env.PORT, (req, res) => {
      console.log("Connection is Established at port:3000......");
    });
    console.log("Database Connections has been Establized....");
  })
  .catch((error) => {
    console.error("Error Found database not connected");
  });

app.get('/health-check', (req, res) => {
  res.status(200).json({message: "Server is healthy"})
})
