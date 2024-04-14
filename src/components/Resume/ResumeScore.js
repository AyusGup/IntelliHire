import React, { useState } from "react";
import DownArrow from "../../helper/svg";
import { useLocation } from 'react-router-dom';
import { useScore } from "../../context/ScoreProvider";

const ResumeScore = () => {
  // const location = useLocation();
  // const { keywords } = location.state;
  // console.log(keywords);
  const [score, setScore] = useScore();
  console.log(score)
  const [scoreParts, setScoreParts] = useState(null);
  return (
     <>
        <div className="w-full h-screen flex items-center justify-center  bg-gray-950">
        <div className=" relative w-[50vh] h-[50vh] bg-orange-600 rounded-full flex flex-col items-center p-auto shadow-2xl shadow-slate-600  ">
          <p className="mt-[10%]">Your Score</p>
          <p className=" text-8xl mt-[26%] ">{score?.percentagematch || ""}</p>
        </div>
</div>
        
        {" "}
        <div className="w-full h-[50vh] bg-slate-300 flex justify-center items-center">
        <div className="h-1/2 w-1/2 bg-slate-500 rounded-xl p-3">
          <h1 className="text-2xl text-slate-300 font-bold text-center drop-shadow-md">Skills</h1>
          <button
            onClick={() => {
              setScoreParts("Profile");
            }}
            className="h-1/4"
          >
           
          </button>
          <button
            onClick={() => {
              setScoreParts("KeyWords");
            }}
            className="h-1/4"
          >
            {score?.missingkeyword || ""}
          </button>
          <button
            onClick={() => {
              setScoreParts("Skills");
            }}
            className="h-1/4"
          >
          </button>
        </div>
        </div>
        
      </>);
    
};
export default ResumeScore;
