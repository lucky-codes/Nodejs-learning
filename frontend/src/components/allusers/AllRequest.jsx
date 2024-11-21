import React, { useState, useEffect } from "react";
import { RequestApi, RequestactionApi } from "../../utils/apiHandler";
import RequestInfo from "./RequestInfo";

const AllRequest = () => {
  const [data, setData] = useState(null);
  const [toggle, setToggle] = useState({
    showData: null,
  });
  useEffect(() => {
    RequestApi(setData);
  }, []);

  const handleInfo = (id) => {
    setToggle((prev) => ({ showData: prev.showData === id ? null : id }));
  };
  const handleDecision = (decision, id) => {
    RequestactionApi(decision,id)
    
    alert(decision)
  };

  return (
    <div className="text-white w-full ">
      {data &&
        data.map((value) => (
          <div
            key={value._id}
            className="bg-gray-600 w-full h-[160px] my-2 p-4 rounded-xl"
          >
            <div className=" flex gap-2">
              <img
                className="w-[40px] rounded-md"
                src={value.fromUserId.photoUrl}
                alt=""
              />
              <p
                className="font-bold hover:cursor-pointer"
                onClick={() => handleInfo(value._id)}
              >
                {value.fromUserId?.firstName.toUpperCase() +
                  " " +
                  value.fromUserId.lastName.toUpperCase()}
              </p>
              {toggle.showData === value._id && <RequestInfo value={value} />}
            </div>
            <div className="flex ml-[5%] my-4 gap-20">
              <button
                className="bg-green-800 p-3 px-8 rounded-3xl hover:bg-green-950"
                onClick={() => handleDecision("accepted",value._id)}
              >
                Accept
              </button>
              <button
                className="bg-red-800 p-3 px-8 rounded-3xl hover:bg-red-950"
                onClick={() => handleDecision("rejected", value._id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AllRequest;
