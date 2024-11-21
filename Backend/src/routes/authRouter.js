const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const userModel = require("../Models/user");
const jwt = require("jsonwebtoken");
const validator = require("validator");
authRouter.post("/signup", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      birthDate,
      email,
      password,
      about,
      skills,
      gender,
      photoUrl,
      interestedIn,
      looking,
    } = req.body;
    validateSignUpData(req);
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      firstName,
      lastName,
      birthDate,
      email,
      password: passwordHash,
      about,
      skills,
      gender,
      photoUrl,
      interestedIn,
      looking,
    });
    await newUser.save();
    res.send("User added successfully");
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(user)
    console.log(email);
    console.log(password);

    if (!validator.isEmail(email)) {
      console.log("Entered1");
      throw new Error("Invalid Credentials");
    }
    const user = await userModel.findOne({ email: email });

    if (!user) {
      console.log("Entered2");
      return res.status(404).send("Invalid Credentials");
    }

    const isValidUser = await user.validatePassword(password);
    if (!isValidUser) {
      throw new Error("Credentials Incorrect");
    }
    const token = await user.getJWT();
    res.cookie("token", token, 
      {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    return res.status(200).json({
      statusCode: 200,
      message: 'User logged in successfully',
      accessToken: token
    })

  } catch (error) {
    res.status(400).send("Check credentials:" + error.message);
  }
});
authRouter.post("/logout", async (req, res) => {
  //clean-up activities for logout
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout successfull");
});
module.exports = authRouter;
