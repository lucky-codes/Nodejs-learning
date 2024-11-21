import React, { useEffect, useState } from "react";
import { loggedInUserData } from "../../utils/apiHandler";
import AllRequest from "./allRequest";
import Connections from "./Connections";
const Sidebar = () => {
  const [data, setData] = useState(null);
  const[showRequest, setShowRequest] = useState(false)
  const[showConnection, setShowConnection] = useState(false)

  useEffect(() => {
    loggedInUserData(setData);
  }, []);
  if (!data) {
    return <div>Loading..........</div>;
  }
  const handleButtonChange = () =>{
    setShowRequest(!showRequest)
    setShowConnection(false)
  }
 const handleConnection = () =>{
   setShowConnection(!showConnection)
   setShowRequest(false)
 }
  
  return (
    <div className="absolute border-r w-[20%] h-screen bg-black">
      <div className="h-[10%]  bg-gradient-to-r p-4 from-purple-600 to-pink-600 ">
        <div className="flex gap-2  text-white/90 hover:bg-black/40 w-40 h-14 items-center px-2 rounded-full">
          <img
            src={data.photoUrl}
            alt=""
            className="border-2 rounded-full w-[40px] h-[40px]"
          />
          <p className="m-2 font-bold">{data.firstName}</p>
          
        </div>
      </div>
      <div className="p-2">
        <div className="flex justify-between">
        <button className="bg-gray-800 px-4 py-4 text-white/85 rounded-2xl" onClick={handleButtonChange}>Requests</button>
        <button className="bg-gray-800 px-4 py-4 text-white/85 rounded-2xl" onClick={handleConnection}>Connections</button>
        </div>
        <div>
        {(showRequest&&<AllRequest/>)}   
        {showConnection&&<Connections/>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
