import React, { useState, useEffect } from "react";
import axios from "axios";
import Photo from "./Photo";
const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthDate: {
      month: "",
      day: "",
      year: "",
    },
    photoUrl: "",
    about: "",
    skills: [],
    gender: undefined,
  });
  const [error, setError] = useState(null);
  // const signupApi = async()=>{
  //  try {
  //   const requestData = {
  //     ...data,
  //     birthDate: `${data.birthDate.year}-${data.birthDate.month}-${data.birthDate.day}`,
  //   };
  //   const response =await fetch("http://localhost:7777/signup",{
  //     method: 'POST',
  //     headers:{
  //       "Content-Type" : "application/json"
  //     },
  //     body:JSON.stringify(requestData)

  //   })
  //   console.log(JSON.stringify(requestData));
  //   const result = await response.json()
  //   if(!response.ok){
  //      throw new Error(result.message||'Invalid Entry')
  //   }
  //   console.log({data:result})
  //  } catch (error) {
  //    console.log(error.message)
  //  }

  // }
  const signupApi = async () => {
    const { month, day, year } = data.birthDate;
    try {
      const requestData = {
        ...data,
        birthDate:
          month && day && year ? new Date(`${year}-${month}-${day}`) : null,
      };
      console.log("Data send", data);
      const response = await axios.post(
        "http://localhost:7777/signup",
        requestData
      );
      if (response.status != 200) {
        throw new Error(response.data.message || "invalid Entry");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onClickHandle = (e) => {
    const { value, name } = e.target;

    if (name in data.birthDate) {
      setData((prev) => ({
        ...prev,
        birthDate: { ...prev.birthDate, [name]: value },
      }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const onClickSetHandle = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
    console.log(data);
  };
  const onHandleUpload = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader(); // Create a new FileReader instance
      reader.onload = () => {
        setData((prev) => ({ ...prev, photoUrl: reader.result })); // Set the Base64 string as the state
      };
      reader.readAsDataURL(file); // Start reading the file as a Data URL
    }
  };
  const validateData = function () {
    const validate = {};
    if (!data.firstName.trim()) {
      validate.firstName = "firstName is mandetory Field";
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
  React.useEffect(() => {
    validateData();
  }, [data]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(error);

    if (error && Object.keys(error).length > 0) {
      alert("Fill all mandetory Field First");
    } else {
      signupApi();
    }
  };
  return (
    <div className=" w-full flex-1 bg-black">
      <form
        action=""
        onSubmit={(e) => e.preventDefault()}
        className="signup text-white/80 flex flex-col gap-2 m-20 mt-4 mx-[500px]"
      >
        <h1 className="text-white mx-[180px]  font-semibold text-4xl">
          Create account
        </h1>
        <label htmlFor="First Name" className="font-bold">
          First Name
        </label>
        <input
          type="text"
          value={data.firstName}
          name="firstName"
          onChange={onClickHandle}
          className="w-[600px] h-10 rounded-md text-white/80 border-[1px] p-5 bg-black"
        />
        {error && <span className="text-red-800">{error.firstName}</span>}
        <label htmlFor="Last name" className="font-bold">
          Last name
        </label>
        <input
          type="text"
          value={data.lastName}
          name="lastName"
          onChange={onClickHandle}
          className="w-[600px] h-10 rounded-md text-white/80 border-[1px] p-5 bg-black"
        />
        <label htmlFor="Email" className="font-bold">
          Email
        </label>
        <input
          type="text"
          value={data.email}
          name="email"
          onChange={onClickHandle}
          className="w-[600px] h-10 rounded-md text-white/80 border-[1px] p-5 bg-black"
        />
        {error && <span className="text-red-800">{error.email}</span>}
        <label htmlFor="Last name" className="font-bold">
          Password
        </label>
        <input
          type="password"
          value={data.password}
          name="password"
          onChange={onClickHandle}
          className="w-[600px] h-10 rounded-md text-white/80 border-[1px] p-5 bg-black"
        />
        {error && <span className="text-red-800">{error.password}</span>}
        <p className="font-bold">Birth</p>
        <div className="flex gap-3">
          <div className="flex flex-col">
            <label htmlFor="">Month</label>
            <select
              type="text"
              value={data.birthDate.month}
              name="month"
              onChange={onClickHandle}
              className="w-auto h-10 rounded-lg text-white/80 border-2 p-5 bg-black"
            >
              <option value="" className="">
                Select Month
              </option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
          <div className="flex flex-col text-white">
            <label htmlFor="">Day</label>
            <select
              type="text"
              value={data.birthDate.day}
              name="day"
              onChange={onClickHandle}
              className="w-20 h-10 rounded-lg text-white/80 border-2 p-5 bg-black"
            >
              {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                <option className="text-white" value={day} key={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="">
              Year
            </label>
            <select
              type="text"
              value={data.birthDate.year}
              name="year"
              onChange={onClickHandle}
              className="w-20 h-10 rounded-lg text-white/80 border-2 p-5 bg-black"
            >
              {Array.from({ length: 100 }, (_, i) => (
                <option
                  key={i}
                  className="text-white bg-green-900"
                  value={2024 - i}
                >
                  {2024 - i}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="font-bold">Gender</p>
        <div className="flex gap-5">
          <button
            name="gender"
            className="border-2 px-16 py-2 rounded-xl"
            onClick={() => onClickSetHandle("gender","Man")}
          >
            Male
          </button>
          <button
            name="gender"
            className="border-2 px-16 py-2 rounded-xl"
            onClick={() => onClickSetHandle("gender","Female")}
          >
            Female
          </button>
          <button
            name="gender"
            className="border-2 px-16 py-2 rounded-xl"
            onClick={() => onClickSetHandle("gender","Others")}
          >
            Others
          </button>
        </div>
        <label htmlFor="">Show my gender on profile</label>
        <p className="font-bold">Interested in</p>
        <div className="flex gap-5">
          <button
            className="border-2 px-16 py-2 rounded-xl"
            onClick={() => onClickSetHandle("intersetedIn","Frontend")}
          >
            Frontend
          </button>
          <button
            className="border-2 px-16 py-2 rounded-xl"
            onClick={() => onClickSetHandle("intersetedIn","Backend")}
          >
            Backend
          </button>
          <button
            className="border-2 px-16 py-2 rounded-xl"
            onClick={() => onClickSetHandle("intersetedIn","Fullstack")}
          >
            Fullstack
          </button>
        </div>
        <p className="font-bold">Looking for</p>
        <div></div>
        <div>
          <button
            className="border-2 px-16 bg-green-800 text-white py-2 rounded-xl"
            onClick={handleSubmit}
          >
            Create Account
          </button>
        </div>
        <Photo data={data.photoUrl} onHandleUpload={onHandleUpload} />
      </form>
    </div>
  );
};

export default Signup;
