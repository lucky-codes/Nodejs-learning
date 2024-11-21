import React from "react";
import { Link } from "react-router-dom";
const NavBar = ({setLogin}) => {
  const handleShow = () => {
    setLogin(true)
  };
  return (
    <div className="relative flex inset-x-0  text-white ">
      <div className="flex my-4">
        <img
          src="https://logos-world.net/wp-content/uploads/2020/09/Tinder-Emblem.png"
          className="w-30 h-20"
          alt=""
        />
        <h1 className="text-3xl font-bold my-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          DEV TINDER
        </h1>
      </div>
      <div className="absolute left-[42%]  my-8 text-xl flex gap-5">
        <p>Products</p>
        <p>Learn</p>
        <p>Safety</p>
        <p>Support</p>
        <p>Download</p>
      </div>
      <div className="absolute right-3 mx-10 my-6">
        <button
          className="bg-white px-5 py-3 rounded-full text-black "
          onClick={handleShow}
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default NavBar;
