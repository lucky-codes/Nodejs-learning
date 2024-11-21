import React, { useEffect, useState } from "react";
import { connectionsApi } from "../../utils/apiHandler";
import RequestInfo from "./RequestInfo";

const Connections = () => {
  const [data, setData] = useState(null);
  const[show, setShow]= useState(null)
  useEffect(() => {
    connectionsApi(setData);
  }, []);
  const handleShowProfile = (id) => {
    setShow(prev=>prev===id?null:id)
  };
  return (
    <div>
      <div>
        {data &&
          data.map((value) => (
            <div
              key={value._id}
              className="bg-gray-600 w-full h-[160px] my-2 p-4 rounded-xl"
            >
              <div className=" flex gap-2 text-white/80">
                <img
                  className="w-[40px] rounded-md"
                  src={value.photoUrl}
                  alt=""
                />
                <p className="font-bold hover:cursor-pointer">
                  {value.firstName.toUpperCase() +
                    " " +
                    value.lastName.toUpperCase()}
                </p>
                <button onClick={()=>handleShowProfile(value._id)} className="flex bg-yellow-600 hover:bg-yellow-800 font-semibold w-[150px] justify-center items-center rounded-3xl h-[40px]">
                  Show Profile
                </button>
                {show===value._id&&<RequestInfo value={value}/>}
              </div>
              <div className="flex ml-[5%] my-4 gap-20">
                <button className="bg-green-400 font-semibold p-3 px-8 rounded-3xl hover:bg-green-950">
                  Message
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Connections;
