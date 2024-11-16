import React from "react";
import { FaUpload } from "react-icons/fa6";
const Photo = ({ data, onHandleUpload }) => {
  return (
    <div className="photo w-[300px] h-[300px] bg-white/50 absolute top-[20%] right-[10%] border-dotted border-2 border-green-900">
      <img
        src={
          data ||
          "https://e1.pxfuel.com/desktop-wallpaper/53/877/desktop-wallpaper-whatsapp-dp-whatsapp-dp-cute-whatsapp-dp.jpg"
        }
        alt="Nothing"
        className="w-[300px] h-[260px]"
      />
      <input
        type="file"
        accept="image/*"
        name="photoUrl"
        className="hidden"
        id="file-upload"
        onChange={onHandleUpload}
      />
      <label htmlFor="file-upload" className="flex justify-center">
      <button className='flex gap-2'><FaUpload className=" text-xl mt-1 text-green-300"/>Upload</button>
      </label>
      
    </div>
  );
};

export default Photo;
