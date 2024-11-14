const express = require("express");
const profileouter = express.Router();
const { userAuth } = require("../middleware/auth.js");
const { validateEditProfile } = require("../utils/validation.js");
profileouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});
profileouter.patch("/profile/edit",userAuth, async (req, res) => {
  try {
    if (!validateEditProfile(req)) {
      throw new Error("Invalid Edit");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.json({
      message: "Data Edit succesfully",
      data: loggedInUser,
    });
  } 
  catch (error) {
    res.status(500).send("Error:" + error.message);
  }
});
module.exports = profileouter;
