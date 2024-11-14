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
1.Middleware->functions or call back function which is inside methods like get("/",(req,res,next)=>{},(req,res,next)=>{},(req,
res)=>{}) is called middleware. Whenever you make api call it goes through middleware chains to get the response.

 Q.what is the use of middleware?
Ans.=> if we have multiple api calls like for get user delete user
app.use("/user",(req, res, next)=>{
const token = "xyz";
const isUSerAuthenticated = token==="xyz";

if(!isUSerAuthenticated){
    res.status(401).send("user is not authorized")
}
else{
    next();
}
})
app.get(
  "/user",
  (req, res, next) => {
    res.send("Rounte Handle 1");
    next();
  },
  (req, res) => {
    res.send("Rounte Handle 2");
  }
);

app.listen(3000, () => {
  console.log("server is started on port:3000");
});



2.we have to send respose res.send() back or else req will be hanging 
to handle this problem we can use next();
next()=> {
next direclty jump to next call back fuction skipping anythingw wrriten after next so order matter
if there is not call back or routehandler after next it will break and show the error 
} 
app.get(
  "/user",
  (req, res, next) => {
    // res.send("Rounte Handle 1");// this is commenting that why res will be sent from next Handle 2 using next() if this is not commented header will not set because tcp connection is made on first call and after res connection is lost
    next();
  },
  (req, res) => {
    res.send("Rounte Handle 2");
  }
);

Scheme=> what all things you r going to store into collection is called scheme

JWT-Token
jwt.sign({mention the data you want to hide into token},"mention your secret key")
jwt.verify(pass the token, "pass the secret key")
In Express there is a fuction called cookies you can use it to create cookies
res.cookie() will create cookie
req.cookies will retrieve cookies from the server
