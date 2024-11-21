import validator from "validator";
export const validateData = function (data,setError) {
    const validate = {};
    if (!data.firstName.trim()) {
      validate.firstName = "firstName is mandetory Field";
    }
    if(!validator.isEmail(data.email)){
       validate.email="Enter correct Email Address";
    }
    if(!validator.isStrongPassword(data.password)){
      validate.password="Password is not Strong Enough";
    }
    if (!data.email.trim()) {
      validate.email = "email is mandetory Field";
    }
    if (!data.password.trim()) {
      validate.password = "Password is a mandetory Field";
    }
    console.log(Object.keys(validate).length);

    if (Object.keys(validate).length >= 0) {
      setError(validate);
    }
  };