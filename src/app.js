const express = require("express");
const app = express();
app.use("/test",(req, res)=>{
    res.send("Hello server")
})
app.use("/dashboard",(req, res)=>{
    res.send("dashboard ")
})
app.use("/",(req, res)=>{
    res.send("Hello lucky ")
})
app.listen(3000, ()=>{
console.log("server is started on port:3000")
});