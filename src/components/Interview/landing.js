import React, { useState } from "react";
import { ContainerScroll } from "../ui/container-scroll-animation.tsx";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect.tsx";
import Input from "../ui/input.tsx";
import Contain from "../ui/container.tsx";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// import { HoverEffect } from "../ui/card-hover-effect";
// import { BackgroundGradient } from "../ui/background-gradient.tsx";
// import { HoverBorderGradient } from "../ui/border-gradient.tsx";
export default function InterviewLanding() {
  const words = [
    {
      text: "Practice",
    },
    {
      text: "for",
    },
    {
      text: "Interview",
    },
    {
      text: "with",
    },
    {
      text: "INTELLIHIRE.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  const [postID, setPostID] = useState("General");
  const [typeID, setTypeID] = useState("Behavioural");

  const [roomId, setRoomId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleItemClick = (item) => {
    setSelectedItem(item);
    console.log(selectedItem);
    const InterviewerLink = document.getElementById("copy-link");
    setRoomId(getRandomNumber(1, 100));
  };

  return (
    <div className="bg-black flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Scroll Animations
              </span>
            </h1>
          </>
        }
      >
        {/* <img
          src={`/linear.webp`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        /> */}

        <div className="relative">
          <TypewriterEffectSmooth words={words} />
          <label className="text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            <p className="py-3">Job Post</p>
            <Input id="firstname" placeholder="Software Engineer" type="text" />
          </label>
          {/* //! Bhai yaha se div start hai option ka */}
          <div className="flex justify-between w-full">
            <div className="text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              <p className="py-3">Type</p>
              <div className="flex gap-10">
                <div className="flex gap-2">
                  <input
                    id="Interview"
                    name="Interview-type"
                    value="Behaviour"
                    type="radio"
                  />
                  <label for="Behaviour">Behaviour</label>
                </div>
                <div className="flex gap-2">
                  <input
                    id="Interview"
                    name="Interview-type"
                    value="Technical"
                    type="radio"
                  />
                  <label for="Technical">Technical</label>
                </div>
              </div>
            </div>
            {/* <Contain content="This content will be copied" /> */}
            <div className="flex justify-around gap-12 py-4">
              {/* <div
              className="w-[10vw] h-[10vw] inline-block bg-slate-500 "
            > */}
              <p className="text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Interviewer
              </p>
              <motion.div
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-20 px-3 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] text-center"
                whileHover={{ scale: 1.1 }}
                onClick={() => handleItemClick("bot")}
                whileTap={{ scale: 0.9 }}
              >
                bot
                <BottomGradient />
              </motion.div>
              {/* </div> */}
              {/* <div className="w-10 h-12 inline-block bg-slate-500 text-white">
              AI3
            </div>
            <div className="w-10 h-12 inline-block bg-slate-500 text-white">
              AI4
            </div> */}

              <motion.div
                whileHover={{ scale: 1.1 }}
                onClick={() => handleItemClick("online")}
                whileTap={{ scale: 0.9 }}
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-20 px-3 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] text-center"
              >
                online
                <BottomGradient />
              </motion.div>
              {/* <div
              onClick={() => handleItemClick("online")}
              className={
                " cursor-pointer w-[10vw] h-[10vw] inline-block text-white bg-slate-500"
              }
            >
              ONline
            </div> */}
            </div>
          </div>
          {selectedItem === "online" ? (
            <Contain content="This content will be copied" />
          ) : (
            <></>
          )}
          <div className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] bottom-2">
            <Link
              // to={"Details/" + postID + "/" + typeID + "/ManualInterviewer/Hardik"}
              // to={"Mylobby"}
              to={
                "Details/" +
                postID +
                "/" +
                typeID +
                "/ManualInterviewer/mylobby/" +
                selectedItem
              }
            ></Link>
            Submit
            <BottomGradient />
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
