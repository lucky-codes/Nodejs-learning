import React, { useState } from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import Login from "./Login";
const Home = () => {
  const [login, setLogin] = useState(null);
 

  return (
    <div className='fixed overflow-auto bg-[url("https://www.futureagenda.org/wp-content/uploads/2018/12/everything_connected-1280x800-c-center.jpg")] bg-cover bg-no-repeat bg-center w-full flex-1 min-h-screen '>
      <div className="absolute z-[2] inset-x-0">
      <NavBar setLogin={setLogin}/>
      </div>
      <div className="absolute inset-0 z-0 bg-black/30"></div>
     {login&& <div className="absolute z-10 inset-0 bg-black/30">
        <Login setLogin={setLogin} />
      </div>}
      <div className=" flex flex-col gap-10 absolute z-[2] left-[23%] items-center mt-[350px] ">
        <h1 className="text-7xl text-green-300">
          Connect with Developers Community
        </h1>
        <Link
          to="/signup"
          className="text-white px-10 py-4 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-2xl"
        >
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Home;
