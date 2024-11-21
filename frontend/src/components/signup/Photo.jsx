import React from "react";
import { FaUpload } from "react-icons/fa6";
const Photo = ({ data, onHandleUpload }) => {
  return (
    <div className=" w-[300px] h-[300px] border-dotted border-2 border-green-900">
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
      <div className="flex justify-center">
        <label htmlFor="file-upload" className="flex gap-3 w-20 cursor-pointer">
          <FaUpload className=" text-xl mt-1 text-green-300" />
          <span>Upload</span>
        </label>
      </div>
    </div>
  );
};

export default Photo;
