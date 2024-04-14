import { useState } from "react";
import { motion } from "framer-motion";
import { Link, redirect, Router } from "react-router-dom";
import axios from "axios";
import { useScore } from "../../context/ScoreProvider";

const Resume = () => {
  const [RoleName, setRoleName] = useState("");
  const [score, setScore] = useScore();
  const [form, setForm] = useState({});

  const submitForm = () => {
    const formData = new FormData();
    formData.append("pdf_file", form.pdf_data);
    formData.append("text_data", form.message);

    axios
      .post("http://localhost:5002/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setScore((prev) => ({
          ...prev,
          ...res.data,
        }));
      });
  };
  const GotoDesc = () => {
    return <a href="#Job-describtion" />;
  };
  return (
    <>
      <div className=" bg-gray-950">
        <div className="h-screen w-full flex flex-col items-center justify-center">
          <p className="text-2xl text-slate-300 m-4 font-extrabold drop-shadow-md">
            {" "}
            Choose the role
          </p>
          <select
            name="role"
            id="role"
            className="border-4 border-white w-1/4 h-[10%] text-3xl font-bold rounded-xl bg-yellow-500 hover:shadow-[55px_-43px_120px_rgba(112,0,255,0.25),-74px_39px_120px_rgba(204,0,255,0.25)] "
            onChange={(e) => {
              setForm({ ...form, role: e.target.value });
              GotoDesc();
            }}
          >
            <option value="" className=" text-slate-500 hover:bg-white ">
              Role
            </option>
            <option value="CA">CA</option>
            <option value="SDE">SDE</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
          </select>
        </div>
        <div
          className="h-screen w-full flex flex-col items-center justify-center"
          id="Job-describtion"
        >
          <div className="w-2/5 h-1/2">
            <p className="text-2xl text-slate-300 m-4 font-extrabold hover:drop-shadow-md">
              Enter your JD
            </p>
            <textarea
              type="text"
              placeholder="Describe about your the role"
              className=" w-full h-2/5 text-start rounded-lg border-3 border-white bg-slate-400 shadow-xl hover:shadow-slate-700"
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>
          <motion.div
            className="mt-28 h-16 w-32 border-2 bg-orange-600 text-black cursor-pointer flex justify-center items-center text-xl font-extrabold rounded-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <a href="#Upload-Resume"> NEXT</a>
          </motion.div>
        </div>
        <div
          className="h-screen w-full flex flex-col items-center justify-center relative"
          id="Upload-Resume"
        >
          <p className="text-2xl text-slate-300 m-4 font-extrabold hover:drop-shadow-md">
            Upload your Resume
          </p>
          <div className="">
            <input
              type="file"
              className="p-5 mb-30 bg-yellow-500 rounded-lg border-2 border-white"
              onChange={(e) =>
                setForm({ ...form, pdf_data: e.target.files[0] })
              }
            />
          </div>

          <motion.div
            className="mt-28 h-16 w-32 border-2 bg-orange-600 text-black cursor-pointer flex justify-center items-center text-xl font-extrabold rounded-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link
              //  to={"ResumeScore?match=" + result.percentagematch + "&role=" + form.role + "&key=" + result.missingkeyword + "&words" + result.wordlength}
              //  to={{
              //     pathname: "/ResumeScore",
              //     state: { keywords: result.missingkeyword}
              //   }}
              // to={`ResumeScore?keywords=${encodeURIComponent(result.missingkeyword)}&role=${form.role}&match=${result.percentagematch}&words=${result.wordlength}`}
              to={"ResumeScore/2"}
              onClick={() => {
                console.log(form);
                submitForm();
              }}
            >
              SUBMIT
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Resume;
