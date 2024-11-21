const validator = require("validator");
const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName) {
    throw new Error(" Need to fill first name and last name this field");
  }
  if (firstName.length < 2 || firstName.length > 50) {
    throw new Error("Firstname field is incorrect");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Email address that you entered is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error(" Password is not strong enough");
  }
};
const validateEditProfile = (req) => {
  const validateUser = [
    "firstName",
    "lastName",
    "age",
    "photoUrl",
    "about",
    "skills",
    "gender",
  ];
  const isUserAllowed = Object.keys(req.body).every((data) =>
    validateUser.includes(data)
  );
  return isUserAllowed;
};

module.exports = {
  validateSignUpData,
  validateEditProfile,
};
