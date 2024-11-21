const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.EMAIL_ID}:${process.env.DB_password}@cluster0.ajsvc.mongodb.net/devtinder`
  );
};
module.exports = connectDB;
