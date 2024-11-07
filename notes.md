use()=> handle request 
listen() => listen request
get()=> this will only handle GET call to specific path i.e. "/user"
--------------------------------------------------------------------------
routing:-
const express = require("express");
const app = express();
app.use("/test",(req, res)=>{
    res.send("Hello server")
})
app.get("/user/:userid",(req, res)=>{
    console.log(req.params);
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
----------------------------------------------------------------
middleWare& Error handling:-
1.we have to send respose res.send() back or else req will be hanging 
to handle this problem we can use next();
next()=> {
next direclty jump to next call back fuction skipping anythingw wrriten after next so order matter
if there is not call back or routehandler after next it will break and show the error 
} 
app.use(
  "/user",
  (req, res, next) => {
    // res.send("Rounte Handle 1");// this is commenting that why res will be sent from next Handle 2 using next() if this is not commented header will not set because tcp connection is made on first call and after res connection is lost
    next();
  },
  (req, res) => {
    res.send("Rounte Handle 2");
  }
);