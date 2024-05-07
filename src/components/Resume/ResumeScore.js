import React, { useEffect, useState } from "react";
import { useScore } from "../../context/ScoreProvider";
import { MagnifyingGlass } from "react-loader-spinner";

const ResumeScore = () => {
  // const location = useLocation();
  // const { keywords } = location.state;
  // console.log(keywords);
  const [score, setScore] = useScore();
  console.log(score)
  const [scoreParts, setScoreParts] = useState(null);
  useEffect(() => {
    return ()=>{
      setScore(null);
    }
  }, []);

  if(!score){
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-950">
        <img src="/resume.png" alt="reviewing..." />
        <MagnifyingGlass
          visible={true}
          height="120"
          width="120"
          ariaLabel="magnifying-glass-loading"
          wrapperStyle={{
            marginTop: "-300px"
          }}
          wrapperClass="magnifying-glass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
          />
      </div>
    );    
  }

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
