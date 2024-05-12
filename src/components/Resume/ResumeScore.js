import React, { useEffect, useState } from "react";
import { useScore } from "../../context/ScoreProvider";
import { MagnifyingGlass } from "react-loader-spinner";
import { SparklesCore } from "../ui/sparkles.tsx";
import { BackgroundGradient } from "../ui/background-gradient.tsx";
import { TypewriterEffect } from "../ui/typewriter-effect.tsx";

const ResumeScore = () => {
  // const location = useLocation();
  // const { keywords } = location.state;
  // console.log(keywords);
  const [score, setScore] = useScore();
  console.log(score);
  const [scoreParts, setScoreParts] = useState(null);
  useEffect(() => {
    return () => {
      setScore(null);
    };
  }, []);

  const words = [
    {
      text: "Cloud",
    },
    {
      text: "Engineer",
    },
    {
      text: ",",
    },
    {
      text: "project details",
    },
    {
      text: "INTELLIHIRE.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  // if (!score) {
  //   return (
  //     <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-950">
  //       <img src="/resume.png" alt="reviewing..." />
  //       <MagnifyingGlass
  //         visible={true}
  //         height="120"
  //         width="120"
  //         ariaLabel="magnifying-glass-loading"
  //         wrapperStyle={{
  //           marginTop: "-300px",
  //         }}
  //         wrapperClass="magnifying-glass-wrapper"
  //         glassColor="#c0efff"
  //         color="#e15b64"
  //       />
  //     </div>
  //   );
  // }

  return (
    <div className="bg-black min-h-screen">
      {/* <div className="w-full h-screen flex items-center justify-center  bg-gray-950">
        <div className=" relative w-[50vh] h-[50vh] bg-orange-600 rounded-full flex flex-col items-center p-auto shadow-2xl shadow-slate-600  ">
          <p className="mt-[10%]">Your Score</p>
          <p className=" text-8xl mt-[26%] ">{score?.percentagematch || ""}</p>
        </div>
</div> */}
      {/* //!score component */}
      <div className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
          Score: {score?.percentagematch || ""}
        </h1>
        <div className="w-[40rem] h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>

      {/* KEywords */}
      {/* <div className="w-full h-[50vh] bg-slate-300 flex justify-center items-center">
        <div className="h-1/2 w-1/2 bg-slate-500 rounded-xl p-3">
          <h1 className="text-2xl text-slate-300 font-bold text-center drop-shadow-md">
            Skills
          </h1>
          <button
            onClick={() => {
              setScoreParts("Profile");
            }}
            className="h-1/4"
          ></button>
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
          ></button>
        </div>
      </div> */}
      <div className="w-full p-4">
        <BackgroundGradient className="w-full rounded-[22px] p-8 bg-black min-h-20 m-0">
          <h1 className="text-4xl font-semibold text-white text-center pb-2">
            Your skills
          </h1>
          <TypewriterEffect
            words={score?.missingkeyword || words}
            className=" text-lg"
          />
        </BackgroundGradient>
      </div>
    </div>
  );
};
export default ResumeScore;
