import { useState } from "react";
import { motion } from "framer-motion";
import { Link, redirect, Router } from "react-router-dom";
import axios from "axios";
import { useScore } from "../../context/ScoreProvider";
import ResumeLanding from "./hero";
// import ResumeForm from "./form.tsx";
import Input from "../ui/input.tsx";
import TextRevealCard from "./Card.js";
import { BackgroundGradient } from "../ui/background-gradient.tsx";

const Resume = () => {
  const [RoleName, setRoleName] = useState("");
  const [score, setScore] = useScore();
  const [form, setForm] = useState({});

  const submitForm = () => {
    const formData = new FormData();
    formData.append("pdf_file", form.pdf_data);
    formData.append("text_data", form.message);

    axios
      .post("https://intellihire-flask.onrender.com/predict", formData, {
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
      <ResumeLanding />
      {/* <ResumeForm /> */}

      <div className=" bg-black">
        <div className="w-full h-fit flex justify-center">
          <div className="w-full 2xl:w-4/5 xl:w-[90%]  h-fit flex justify-between max-xl:flex-wrap">
            <TextRevealCard />
            <ResumeUI />
          </div>
        </div>

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
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const ResumeUI = () => {
  return (
    <BackgroundGradient className="max-w-lg min-w-96 w-full  mx-0 rounded-[22px] p-4 md:p-8  bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Resume Checker
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to know your ATS score and get some tips to improve your resume
      </p>

      <form className="my-8">
        <div className="flex flex-col space-y-2 md:space-y-0 md:space-x-2 mb-4 gap-6">
          <label className="text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            <p className="py-3">Name</p>
            <Input id="firstname" placeholder="Ayush" type="text" />
          </label>

          <label className=" text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            <p className="py-3">Job Role</p>
            <Input id="lastname" placeholder="SDE" type="text" />
          </label>
          <label className="text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            <p className="py-3">Job Decription</p>
            <Input
              id="lastname"
              placeholder="I am a fullstack developer "
              type="textarea"
            />
          </label>
          <label className="text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            <p className="py-3">Resume file(.PDF)</p>
            <Input id="lastname" placeholder="SDE" type="file" accept=".pdf" />
          </label>
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Submit
            <BottomGradient />
          </button>
        </div>
      </form>
    </BackgroundGradient>
  );
};
export default Resume;
