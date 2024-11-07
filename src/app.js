const express = require("express");
const app = express();
app.use("/test",(req, res)=>{
    res.send("Hello server")
})
app.get("/user",(req, res)=>{
    res.send({firstName : "Lucky", lastName :  "Singh"})
})
app.post("/user", (req, res)=>{
    res.send("data saved to the database")
})
app.delete("/user", (req,res)=>{
    res.send("deleted")
})

app.listen(3000, ()=>{
console.log("server is started on port:3000")
});