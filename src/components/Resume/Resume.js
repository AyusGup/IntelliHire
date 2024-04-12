import { useState } from "react";

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
      .post("http://localhost:5000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setScore((prev)=>({
          ...prev,
          ...res.data
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
          <p className="text-2xl text-slate-300"> Choose the role</p>
          <select
            name="role"
            id="role"
            className="w-1/4 h-[10%] text-3xl rounded-xl"
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
            <option value="Y">Y</option>
            <option value="Y">Y</option>
          </select>
        </div>
        <div
          className="h-screen w-full flex flex-col items-center justify-center"
          id="Job-describtion"
        >
          <div className="w-2/5 h-1/2">
            <p className="text-2xl text-slate-300">Enter your JD</p>
            <textarea
              type="text"
              placeholder="Describe about your the role"
              className=" w-full h-2/5 text-start"
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>
          <button className=" bg-amber-800 border-1 rounded-sm p-2">
            <a href="#Upload-Resume"> NEXT</a>
          </button>
        </div>
        <div
          className="h-screen w-full flex flex-col items-center justify-center relative"
          id="Upload-Resume"
        >
          <p className="text-2xl text-slate-300">Upload your Resume</p>
          <input
            type="file"
            onChange={(e) => setForm({ ...form, pdf_data: e.target.files[0] })}
          />

          <button className="absolute bottom-[5%] left-1/2 bg-amber-800 border-1 rounded-sm p-2">
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
          </button>
        </div>
      </div>
    </>
  );
};

export default Resume;
