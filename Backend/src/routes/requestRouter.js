const express = require("express");
const requestRouter = express.Router();
const ConnectionSchemeModel = require("../Models/connectionRequestModel");
const { authMiddleware } = require("../middleware/auth");
const connectDB = require("../config/database");
const user = require("../Models/user");
requestRouter.post(
  "/request/send/:status/:userId",
  authMiddleware,
  async (req, res) => {
    try {
      const status = req.params.status;
      const userId = req.params.userId;
      const loggedInUser = req.user;
      if (!loggedInUser) {
        return res.send("Login or sign up to send request");
      }
      const ConnectionData = new ConnectionSchemeModel({
        fromUserId: loggedInUser,
        toUserId: userId,
        status: status,
      });
      const isStatusValid = ["interested", "ignored"];
      if (!isStatusValid.includes(status)) {
        return res.send({ message: "Status is incorrect" });
      }
      const isConnectionValid = await ConnectionSchemeModel.findOne({
        $or: [
          { fromUserId: loggedInUser, toUserId: userId },
          { fromUserId: userId, toUserId: loggedInUser },
        ],
      });
      if (loggedInUser._id.equals(userId)) {
        return res.send("Cannot send request to your self");
      }
      if (isConnectionValid) {
        return res.json({ message: "connection already exist" });
      }
      const isUserExist = await user.findById(userId);
      if (!isUserExist) {
        return res.status(404).send("User Does not exist");
      }
      await ConnectionData.save();
      res.send("Connection send successfully");
    } catch (error) {
      res.send("Error occurred :" + error.message);
    }
  }
);
requestRouter.post(
  "/request/review/:status/:requestId",
  authMiddleware,
  async (req, res) => {
    try {
      const { status, requestId } = req.params;
      const loggedInUser = req.user;
      if (!loggedInUser) {
        return res.status(404).send("Invalid User");
      }
      const isValidStatus = ["accepted", "rejected"];
      if (!isValidStatus.includes(status)) {
        return res.send("Status is inccorrect");
      }
      const validateUser = await ConnectionSchemeModel.findOne({
        _id: requestId,
        toUserId: loggedInUser,
        status: "interested",
      });
      if (!validateUser) {
        return res.send("Invalid database request");
      }
      validateUser.status = status;
      const data = await validateUser.save();
      res.json({ message: "Request has been " + status, body: data });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);
module.exports = requestRouter;
