const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionSchemeModel = require("../Models/connectionRequestModel");
const user = require("../Models/user");
const userRouter = express.Router();
const SAFE_DATA = "firstName lastName age gender skills about photoUrl";
userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedIn = req.user;
    const connectionRequest = await ConnectionSchemeModel.find({
      toUserId: loggedIn._id,
      status: "interested",
    }).populate("fromUserId", SAFE_DATA);

    res.json({ message: "all Connetion request", data: connectionRequest });
  } catch (error) {
    res.status(400).send("Error:" + error.message);
  }
});
userRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const allConnections = await ConnectionSchemeModel.find({
      $or: [{ toUserId: user._id }, { fromUserId: user._id }],

      status: "accepted",
    })
      .populate("fromUserId", SAFE_DATA)
      .populate("toUserId", SAFE_DATA);
    const data = allConnections.map((row) => {
      if (row.fromUserId.toString() === user._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.send({ data });
    // const connections = await Promise.all(
    //   allConnections.map(async (connection) => {
    //     let showData;
    //     if (connection.toUserId.toString() === user._id.toString()) {

    //       await connection.populate(
    //         "fromUserId",
    //         "firstName lastName age about skills"
    //       );
    //       showData = true;
    //     } else if (connection.fromUserId.toString() === user._id.toString()) {

    //       await connection.populate(
    //         "toUserId",
    //         "firstName lastName age about skills"
    //       );
    //       showData = false;
    //     }
    //     return { connection, showData };
    //   })
    // );
    // const data = connections.map(({ connection, showData }) =>
    //   showData ? connection.fromUserId : connection.toUserId
    // );
    // res.json({ message: "All the connections", data: data });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
userRouter.get("/feed", userAuth, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  limit=limit > 50 ? 50 : limit;
  const skip = (page - 1) * limit;

  try {
    const loggedIn = req.user;
    const connectionRequest = await ConnectionSchemeModel.find({
      $or: [{ fromUserId: loggedIn._id }, { toUserId: loggedIn._id }],
    }).select("fromUserId toUserId");
    const hiddenUserProfiles = new Set();
    connectionRequest.forEach((req) => {
      hiddenUserProfiles.add(req.fromUserId.toString());
      hiddenUserProfiles.add(req.toUserId.toString());
    });
    const dataFeed = await user
      .find({
        $and: [
          { _id: { $nin: Array.from(hiddenUserProfiles) } },
          { _id: { $ne: loggedIn._id } },
        ],
      })
      .select(SAFE_DATA)
      .skip(skip)
      .limit(limit);
    res.send({ Data: dataFeed });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
module.exports = userRouter;
