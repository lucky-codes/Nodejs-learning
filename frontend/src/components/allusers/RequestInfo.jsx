import React from "react";

const RequestInfo = ({ value }) => {
 const calculateAge = (birthDate)=>{
    const birth  = new Date(birthDate)
    const today  = new Date()
    const age = today.getFullYear()-birth.getFullYear()
    const monthDiff = today.getMonth-birth.getMonth
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
    
    return age;
 }
  return (
    <div className="absolute left-[300px] top-56 bg-gray-800 w-[400px] p-5 rounded-xl">
      <div key={value.fromUserId?._id||value._id} className="flex flex-col gap-2">
           <img src={value.fromUserId?.photoUrl||value.photoUrl} alt="" className="h-[400px] rounded-xl " />
          <p>Name = {value.fromUserId?.firstName.toUpperCase()||value.firstName.toUpperCase()+" "+value.fromUserId?.lastName.toUpperCase()}</p>
          <p>Age = {calculateAge(value.fromUserId?.birthDate)||calculateAge(value.birthDate)}</p>
          <p>interestedIn = {value.fromUserId?.interestedIn||value.interestedIn}</p>
          <p>About = {value.fromUserId?.about||value.about}</p>
        </div>
    </div>
  );
};

export default RequestInfo;
