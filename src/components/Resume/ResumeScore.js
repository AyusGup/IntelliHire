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
        {" "}
        <div className="absolute left-0 top-[25vh] h-1/2 w-28 bg-slate-300 rounded-r-xl">
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
            {score.missingkeyword}
          </button>
          <button
            onClick={() => {
              setScoreParts("Skills");
            }}
            className="h-1/4"
          >
            skills
          </button>
        </div>
        <div className=" relative w-[50vh] h-[50vh] bg-orange-600 rounded-full flex flex-col items-center p-auto transition delay-300 translate-x-[-100%]">
          <p className="mt-[10%]">Your Score</p>
          <p className=" text-8xl mt-[26%]">{score.percentagematch || ""}</p>
        </div>
        <DownArrow Class="animate-bounce w-8 h-8 absolute left-[49.5%] bottom-3" />
      </div>
      <div className="w-full h-28">
        <div className="flex w-full h-32 justify-around items-center">
          <div className=" h-28 w-28 hover:bg-slate-500 relative pt-10">
            <div className=" text-xl text-center"> 69</div>
            <div className="text-sm text-center mt-4">Overall Score</div>
          </div>

          <div className=" h-28 w-28 hover:bg-slate-500 relative pt-10">
            <div className=" text-xl text-center"> 69</div>
            <div className="text-sm text-center mt-4">Overall Score</div>
          </div>

          <div className=" h-28 w-28 hover:bg-slate-500 relative pt-10">
            <div className=" text-xl text-center"> 69</div>
            <div className="text-sm text-center mt-4">Overall Score</div>
          </div>

          <div className=" h-28 w-28 hover:bg-slate-500 relative pt-10">
            <div className=" text-xl text-center"> 69</div>
            <div className="text-sm text-center mt-4">Overall Score</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ResumeScore;
