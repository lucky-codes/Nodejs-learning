import React, { useState, useEffect } from "react";
import axios from "axios";
import Photo from "./Photo";
import { validateData } from "../../utils/validation";
import { signupApi } from "../../utils/apiHandler";
import Interestedin from "./Interestedin";
import Head from "./Head";
const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthDate: {
      month: "March",
      day: "1",
      year: "2000",
    },
    photoUrl: "",
    skills: [],
    gender: undefined,
    interestedIn: null,
    looking: "",
    about: "",
  });
  const [content, setContent] = useState("");
  const [lookingFor, setLookingFor] = useState(false);
  const [error, setError] = useState(null);
  const [active, setActive] = useState({
    gender: null,
    interestedIn: null,
    submit: null,
  });
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
    setActive((prev) => ({ ...prev, [field]: value }));
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

  const handleShowInterest = () => {
    setLookingFor(true);
  };

  React.useEffect(() => {
    validateData(data, setError);
  }, [data]);

  const handleSubmit = (e, key, value) => {
    e.preventDefault();
    console.log("error", error);
    console.log("Data", data);
    setActive((prev) => ({ ...prev, [key]: value }));
    if (error && Object.keys(error).length > 0) {
      alert("Fill all mandetory Field First");
    } else {
      signupApi({ data, axios });
    }
  };

  return (
    <div className=" w-full relative flex-1 bg-black/90">
      <Head/>
      <form
        action=""
        onSubmit={(e) => e.preventDefault()}
        className=" signup text-white/80 flex flex-col gap-2 m-20 mt-4 mx-[500px]"
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
          placeholder="Enter your FirstName"
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
          placeholder="Enter your lastName"
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
          placeholder="Enter your Email Address"
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
          placeholder="Enter your Password"
          className="w-[600px] h-10 rounded-md text-white/80 border-[1px] p-5 bg-black"
        />
        {error && <span className="text-red-800">{error.password}</span>}
        <p className="font-bold">Birth</p>
        <div className="flex gap-3">
          <div className="flex flex-col">
            <label htmlFor="">Month</label>
            
            <select
              value={data.birthDate.month}
              name="month"
              onChange={onClickHandle}
              className="w-auto h-10 rounded-lg px-4  text-white bg-black"
            >
              <p className="text-yellow-400">{data.birthDate.month}</p>
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
              type="select"
              value={data.birthDate.day}
              name="day"
              onChange={onClickHandle}
              className="w-auto h-10 rounded-lg text-white px-4  bg-black"
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
              type="select"
              value={data.birthDate.year}
              name="year"
              onChange={onClickHandle}
              className="w-auto h-10 rounded-lg px-4 text-white  bg-black"
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
        <div className="flex gap-5 items-start">
          <button
            name="gender"
            className={`border-2 ${
              active?.gender == "Male" ? "border-yellow-600" : ""
            } px-16 hover:w-[250px] hover:h-[48px] transition-all duration-300 ease-in-out active:bg-green-700 py-2 bg-black rounded-xl`}
            onClick={() => onClickSetHandle("gender", "Male")}
          >
            Male
          </button>
          <button
            name="gender"
            className={`border-2 ${
              active?.gender == "Female" ? "border-yellow-600" : ""
            } px-16 hover:w-[250px] hover:h-[48px] transition-all duration-300 ease-in-out active:bg-green-700 py-2 bg-black rounded-xl`}
            onClick={() => onClickSetHandle("gender", "Female")}
          >
            Female
          </button>
          <button
            name="gender"
            className={`border-2 ${
              active?.gender == "Others" ? "border-yellow-600" : ""
            } px-16 hover:w-[250px] hover:h-[48px] transition-all duration-300 ease-in-out active:bg-green-700 py-2 bg-black rounded-xl`}
            onClick={() => onClickSetHandle("gender", "Others")}
          >
            Others
          </button>
        </div>
        <label htmlFor="">Show my gender on profile</label>
        <p className="font-bold">Interested in</p>
        <div className="btn flex gap-5 items-start">
          <button
            className={`border-2 ${
              active?.interestedIn == "Frontend" ? "border-yellow-600" : ""
            } px-16 hover:w-[250px] hover:h-[48px] transition-all duration-300 ease-in-out active:bg-green-700 py-2 bg-black rounded-xl`}
            onClick={() => onClickSetHandle("interestedIn", "Frontend")}
          >
            Frontend
          </button>
          <button
            className={`border-2 ${
              active?.interestedIn == "Backend" ? "border-yellow-600" : ""
            } px-16 hover:w-[250px] hover:h-[48px] transition-all duration-300 ease-in-out active:bg-green-700 py-2 bg-black rounded-xl`}
            onClick={() => onClickSetHandle("interestedIn", "Backend")}
          >
            Backend
          </button>
          <button
            className={`border-2 ${
              active?.interestedIn == "Fullstack" ? "border-yellow-600" : ""
            } px-16 hover:w-[250px] hover:h-[48px] transition-all duration-300 ease-in-out active:bg-green-700 py-2 bg-black rounded-xl`}
            onClick={() => onClickSetHandle("interestedIn", "Fullstack")}
          >
            Fullstack
          </button>
        </div>
        <p className="font-bold">Looking for</p>
        <button
          className={`${
            lookingFor && "border-yellow-600"
          } bg-black rounded-full btn3 w-[250px] h-[40px] border`}
          onClick={handleShowInterest}
        >
          Edit partner for coding intent
        </button>
        <div>
          {lookingFor && (
            <Interestedin
              setContent={setContent}
              setLookingFor={setLookingFor}
              lookingFor={lookingFor}
              setData={setData}
            />
          )}
          {content && (
            <p className="w-auto max-w-[300px] h-[30px] bg-black rounded-full text-center text-yellow-500/80">
              {content}
            </p>
          )}
        </div>
        <div className="w-full">
          <p className="font-bold">About</p>
          <textarea 
          className="w-1/2 min-h-20 break-all rounded-md overflow-hidden text-white/80 border-[1px] p-2 bg-black"
          placeholder="Write something about youreself" 
          value={data.about}
          name="about"
          onChange={onClickHandle}
           />
        </div>

        <div>
          <button
            className={`${
              error ? "border-red-600" : "border-green-600"
            } border-2 px-16 bg-green-800 text-white py-2 rounded-xl`}
            onClick={(e) => handleSubmit(e, "submit", "true")}
          >
            Create Account
          </button>
        
        </div>
        <div className="fixed inset-y-0 right-60 top-36">
        <Photo data={data.photoUrl} onHandleUpload={onHandleUpload} />
        </div>
      </form>
    </div>
  );
};

export default Signup;
