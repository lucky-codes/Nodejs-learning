const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userScheme = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
      lowercase: true,
    },
    lastName: {
      type: String,
      lowercase: true,

    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email address is not validate");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["Male", "Female", "others"].includes(value)) {
          throw new Error("Gender Field is not valid");
        }
      },
    },
    interestedIn: {
      type: String,
      validate(value) {
        if (!["Frontend", "Backend", "Fullstack"].includes(value)) {
          throw new Error("interenstedIn field is not valid");
        }
      },
    },

    photoUrl: {
      type: String,
      default:
        "https://e1.pxfuel.com/desktop-wallpaper/53/877/desktop-wallpaper-whatsapp-dp-whatsapp-dp-cute-whatsapp-dp.jpg",
    },
    about: {
      type: String,
    },
    skills: {
      type: [String],
    },
    looking: {
      type:String,
      validate(value) {
        if (
          ![
            `\u{1F498}Long-term partner`,
            `\u{1F60D}Long-term open to short`,
            `\u{1F49E} Short-term open to long`,
            `\u{1F90C} Short-term fun`,
            `\u{1F450} New freinds`,
            `\u{1F914}still figuring it out`,
          ].includes(value)
        ) {
          throw new Error ("looking field is filled incorectly")
        }
      },
    },
  },
  { timestamps: true }
);
userScheme.methods.getJWT = async function () {
  const user = this;
  const secret = process.env.SECRET_KEY;
  const token = await jwt.sign({ _id: user._id }, secret, {
    expiresIn: "1d",
  });
  return token;
};
userScheme.methods.validatePassword = async function (passwordInputByUser) {
  const passwordHash = this.password;
  const verifyUSer = await bcrypt.compare(passwordInputByUser, passwordHash);
  return verifyUSer;
};
const user = mongoose.model("user", userScheme);
module.exports = user;
