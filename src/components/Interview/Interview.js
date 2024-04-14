import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

const Interview = () => {
  const [postID, setPostID] = useState("General");
  const [typeID, setTypeID] = useState("Behavioural");

  const [roomId,setRoomId] = useState(null);
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
      <div className="w-full h-full bg-gray-950  m-0 overfolw-scroll snap-x">
        {/* <div className="h-screen flex flex-col items-center justify-around "> */}
        {/* <div className="w-full h-[200vh]  bg-slate-200 flex flex-col justify-around"> */}
        <div className="h-screen w-full flex flex-col items-center justify-center snap-center">
          <p className="text-2xl text-slate-300"> Choose the POST</p>
          <select
            name="POST"
            id="POST"
            className="w-1/4 h-[10%] text-3xl rounded-xl"
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
          <p className="text-2xl text-slate-300"> Choose the POST</p>
          <select
            name="Type"
            id="Type"
            className="w-1/4 h-[10%] text-3xl rounded-xl"
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
                className="h-40 w-60 border-2 bg-green-400 text-white cursor-pointer flex justify-center items-center text-xl"
                whileHover={{ scale: 1.1 }}
                onClick={() => handleItemClick("bot")}
                // whileTap={{ scale: 0.9 }}
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
                className="h-40 w-60 border-2 bg-green-400 text-white cursor-pointer flex justify-center items-center text-xl"
                whileHover={{ scale: 1.1 }}
                onClick={() => handleItemClick("online")}
                // whileTap={{ scale: 0.9 }}
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
          {selectedItem === "online" ? <div className=" w-auto p-2 h-[10%] rounded-sm bg-zinc-700 text-wrap text-white 
          "  id="copy-link">
            {"http://localhost:3000/Interview/Details/"+typeID+"/"+postID+"/ManualInterviewer/mylobby/online/interviewer/room/"+roomId}
          </div> : <></>}
          <div className="absolute bottom-[5%] left-1/2 bg-amber-800 border-1 rounded-sm p-2">
            <Link
              // to={"Details/" + postID + "/" + typeID + "/ManualInterviewer/Hardik"}
              // to={"Mylobby"}
              to={
                "Details/" +
                postID +
                "/" +
                typeID +
                "/ManualInterviewer/mylobby/"+
                selectedItem
              }
            >
              {" "}
              Start
            </Link>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};
export default Interview;
