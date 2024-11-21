import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { allUserProfileData, sendRequestApi } from "../../utils/apiHandler";
import { RxCross2 } from "react-icons/rx";
import { LuHeart } from "react-icons/lu";
const UserProfilePage = () => {
  const [data, setData] = useState(null);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    allUserProfileData(setData);
  }, []);
  // const dataid = data!=null&&data.map((data)=>{return data.firstName})
  // console.log(dataid)
  if (!data) {
    return <div className="text-4xl text-center">Loading........</div>;
  }
  else if(data.length===0){
    return <div className="w-screen h-screen flex justify-center items-center text-white bg-black text-6xl">No data left to show</div>
  }
  const user = data && data[index];

  const userId = user ? data[index]._id : 0;
  if (!userId) {
    <div className="bg-black w-screen h-screen">Empty...</div>;
  }
  let status = "";

  const skipData = () => {
    status = "ignored";
    if (index < data.length - 1) {
      setIndex(index + 1);
      sendRequestApi(status, userId);
    } else if (index == data.length - 1) {
      sendRequestApi(status, userId);
    } else {
      console.log("Limit reached");
    }
  };
  const likedData = () => {
    status = "interested";
    if (index < data.length - 1) {
      setIndex(index + 1);
      sendRequestApi(status, userId);
    } else if (index == data.length - 1) {
      sendRequestApi(status, userId);
    } else {
      console.log("Limit reached");
    }
  };
  const birthDate = data&&new Date(data[index].birthDate);
  const currentDate = new Date();
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDifference = currentDate.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return (
    <div className="relative w-screen h-screen bg-black">
      <div>
        <Sidebar />
      </div>
      <div className="relative w-[30rem] ml-[45%] h-[44rem] mt-[7%] ">
        <div
          className={`bg-gray-700 absolute   text-white w-[25rem] h-[40rem] mx-[8%]`}
        >
          {data && (
            <div className="w-full h-full shadow-2xl shadow-gray-400 ">
              <img
                src={data[index].photoUrl}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black to-transparent opacity-80"></div>
              <div className="absolute  p-3 z-[1] bottom-3 text-white">
                <div className="flex gap-2">
                  <p className="text-2xl font-bold bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
                    {data[index].firstName.toUpperCase()}
                  </p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-yellow-700 to-black bg-clip-text text-transparent">
                    {age}
                  </p>
                </div>
                <p>{data[index].gender}</p>
                <p>{data[index].about.slice(0, 150)}</p>
              </div>
            </div>
          )}
        </div>
        <button
          className="bg-gray-600/80 absolute bottom-[6%] left-[12%] w-[50px] h-[50px] rounded-full flex justify-center items-center"
          onClick={skipData}
        >
          <RxCross2 className="h-[40px] w-[40px] text-green-400" />
        </button>
        <button
          className="bg-gray-600/80 absolute bottom-[6%] right-[12%] w-[50px] h-[50px] rounded-full flex justify-center items-center"
          onClick={likedData}
        >
          <LuHeart className="h-[40px] w-[40px] text-pink-400" />
        </button>
      </div>
    </div>
  );
};

export default UserProfilePage;
