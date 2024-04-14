import React from "react";
import { motion } from "framer-motion";
const Profile = () => {
  return (
    <>
      <div className="flex w-full h-screen gap-6 justify-center items-center bg-zinc-950">
        <div className="w-28 h-fit p-3 bg-slate-400 text-cyan-200 drop-shadow-sm font-bold rounded-xl text-center">
          ag-1086
        </div>
        <div className="h-fit p-5 w-[40%] bg-cyan-950  rounded-lg">
          <div className="text-2xl w-full text-center p-2 text-white drop-shadow-sm font-extrabold">
            {" "}
            Score
          </div>
          <div className="h-20 w-full flex justify-around items-center bg-cyan-700 rounded-lg">
            <div className=" text-cyan-300 font-extrabold"> Resume</div>
            <div className=" text-cyan-200"> 45%</div>
            <motion.div
              className="w-fit h-fit px-3 py-1  bg-orange-600 text-black cursor-pointer flex justify-center items-center text-xl font-extrabold rounded-xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              check
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
