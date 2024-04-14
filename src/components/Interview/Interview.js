import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

const Interview = () => {
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
    <>
      <div className="w-full h-full bg-gray-950  m-0 ">
        {/* <div className="h-screen flex flex-col items-center justify-around "> */}
        {/* <div className="w-full h-[200vh]  bg-slate-200 flex flex-col justify-around"> */}
        <div className="h-screen w-full flex flex-col items-center justify-center snap-center">
          <p className="text-2xl text-slate-300 m-4 font-extrabold drop-shadow-md">
            {" "}
            Choose the POST
          </p>
          <select
            name="POST"
            id="POST"
            className="border-4 border-white w-1/4 h-[10%] text-3xl font-bold rounded-xl bg-yellow-500 hover:shadow-[55px_-43px_120px_rgba(112,0,255,0.25),-74px_39px_120px_rgba(204,0,255,0.25)] "
            onChange={(e) => {
              setPostID(e.target.value);
            }}
          >
            <option value="SDE">SDE</option>
            <option value="CEO">CEO</option>
            <option value="CTO">CTO</option>
            <option value="CFO">CFO</option>
            <option value="CFO">PM</option>
          </select>
        </div>
        <div className="h-screen w-full flex flex-col items-center justify-center snap-center">
          <p className="text-2xl text-slate-300 m-4 font-extrabold drop-shadow-md">
            {" "}
            Choose the POST
          </p>
          <select
            name="Type"
            id="Type"
            className="w-1/4 h-[10%] text-3xl border-4 border-white font-bold rounded-xl bg-yellow-500 hover:shadow-[55px_-43px_120px_rgba(112,0,255,0.25),-74px_39px_120px_rgba(204,0,255,0.25)] "
            onChange={(e) => {
              setTypeID(e.target.value);
            }}
          >
            <option value="Technical">Technical</option>
            <option value="Behaviour">Behaviour</option>
          </select>
        </div>

        {/* //! Type of AI and connect any other */}

        <div className="h-screen w-full flex flex-col items-center justify-center relative snap-center">
          <div className="flex w-1/2 h-1/2 justify-around">
            {/* <div
              className="w-[10vw] h-[10vw] inline-block bg-slate-500 "
            > */}
            <motion.div
              className="h-28 w-48  border-2 bg-green-400 text-black cursor-pointer flex justify-center items-center text-xl font-extrabold rounded-xl hover:shadow-[55px_-43px_120px_rgba(112,0,255,0.25),-74px_39px_120px_rgba(204,0,255,0.25)]"
              whileHover={{ scale: 1.1 }}
              onClick={() => handleItemClick("bot")}
              whileTap={{ scale: 0.9 }}
            >
              Bot
            </motion.div>
            {/* </div> */}
            {/* <div className="w-10 h-12 inline-block bg-slate-500 text-white">
              AI3
            </div>
            <div className="w-10 h-12 inline-block bg-slate-500 text-white">
              AI4
            </div> */}

            <motion.div
              className="h-28 w-48 border-2 bg-green-400 text-black cursor-pointer flex justify-center items-center text-xl font-extrabold rounded-xl hover:shadow-[55px_-43px_120px_rgba(112,0,255,0.25),-74px_39px_120px_rgba(204,0,255,0.25)]"
              whileHover={{ scale: 1.1 }}
              onClick={() => handleItemClick("online")}
              whileTap={{ scale: 0.9 }}
            >
              online
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
          {selectedItem === "online" ? (
            <div
              className=" w-auto p-3 h-[10%] bg-zinc-700 text-wrap text-white rounded-lg border-2 border-white  
          "
              id="copy-link"
            >
              {"https://intelli-hire.vercel.app/Interview/Details/" +
                typeID +
                "/" +
                postID +
                "/ManualInterviewer/mylobby/online/interviewer/room/" +
                roomId}
            </div>
          ) : (
            <></>
          )}
          <motion.div
            className="h-16 w-32 border-2 bg-orange-600 text-black cursor-pointer flex justify-center items-center text-xl font-extrabold rounded-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
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
            >
              {" "}
              Start
            </Link>
          </motion.div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};
export default Interview;
