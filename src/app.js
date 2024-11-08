const express = require("express");
const app = express();
const{middlewareUserAuth}=require("./middleware/auth")
app.use("/user",middlewareUserAuth)
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
