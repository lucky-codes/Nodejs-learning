import React from "react";
import EmojiPicker from "emoji-picker-react";
const Interestedin = ({setData, setContent, setLookingFor, lookingFor }) => {
  const onclickSetContent = (field,value) => {
    setContent(value);
    setData(prev=>({...prev,[field]:value}))

    // setLookingFor(!lookingFor)
  };
  const handleLookingFor =()=>{
    setLookingFor(!lookingFor)
  }
  return (

    <div className="absolute left-[30%] top-[45%] w-[600px]  h-[530px] border border-white bg-gray-800/80">
      <h1 className="flex justify-center mt-5 text-2xl">
        What are you Looking for?
      </h1>
      <p className="text-center">
        All good if it changes. There's something for everyone.{" "}
      </p>
      <div className="flex flex-wrap gap-2 ml-6 mt-1 justify-center items-center  h-[400px]">
        <div className="w-[150px] h-[130px] bg-black p-3">
          <div className="flex justify-center text-[30px]">{"\u{1F498}"}</div>
          <button
            onClick={() => onclickSetContent("looking",`\u{1F498}Long-term partner`)}
            className="text-center"
          >
            Long-term partner
          </button>
        </div>
        <div className="w-[150px] h-[130px] bg-black p-3">
          <div className="flex justify-center text-[30px]">{"\u{1F60D}"}</div>
          <button
          name="looking"
            onClick={() =>
              onclickSetContent('looking',`\u{1F60D}Long-term open to short`)
            }
            className="text-center"
          >
            {" "}
            Long-term open to short
          </button>
        </div>
        <div className="w-[150px] h-[130px] bg-black p-3">
          <div className="flex justify-center text-[30px]">{"\u{1F49E}"}</div>

          <button
            onClick={() =>
              onclickSetContent("looking",`\u{1F49E} Short-term open to long`)
            }
            className="text-center"
          >
            {" "}
            Short-term open to long
          </button>
        </div>
        <div className="w-[150px] h-[130px] bg-black p-3">
          <div className="flex justify-center text-[30px]">{"\u{1F90C}"}</div>

          <button
            onClick={() => onclickSetContent("looking",`\u{1F90C} Short-term fun`)}
            className="text-center"
          >
            Short-term fun
          </button>
        </div>
        <div className="w-[150px] h-[130px] bg-black p-3">
          <div className="flex justify-center text-[30px]">{"\u{1F450}"}</div>
          <button
            onClick={() => onclickSetContent("looking",`\u{1F450} New freinds`)}
            className="text-center"
          >
            New freinds
          </button>
        </div>
        <div className="w-[150px] h-[130px] bg-black p-3">
          <div className="flex justify-center text-[30px]">{"\u{1F914}"}</div>
          <button
            onClick={() => onclickSetContent("looking",`\u{1F914}still figuring it out`)}
            className="text-center"
          >
            still figuring it out
          </button>
        </div>
      </div>
      <button onClick={handleLookingFor} className="absolute bottom-1 rounded-xl text-2xl left-[200px] bg-green-500 w-[200px] h-[40px]">Save</button>
    </div>
  );
};

export default Interestedin;
