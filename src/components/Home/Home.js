// import React, { useEffect, useState } from "react";
// import { useLocation } from 'react-router-dom';
import React, { useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import Header from "../Layout/header";
import { useUser } from "../../context/userProvider";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const access_token = searchParams.get("access_token");
  const username = searchParams.get("username");
  const expires_in = searchParams.get("expires_in");
  const [profile,setProfile] = useUser();
  if(access_token && username && expires_in){
    setProfile({
      token:access_token,
      userName:username,
      expiresIn: expires_in
    })
  }
  
  // if (access_token && username) {
  //   axios.get(`https://490bj8xz-3001.inc1.devtunnels.ms/callback?access_token=${access_token}&username=${username}`)
  //   .then((res)=>{
  //     console.log(res.data);
  //   })

  //   // axios.get(`http://localhost:3001/submitCustomJson?access_token=${access_token}&username=${username}`)
  //   // .then((res)=>{
  //   //   console.log(res.data);
  //   // })
  // }

  return (
    <>
      {/* <Header/> */}
      <div className="w-full h-full bg-gray-950 text-white p-0 mt-20 overflow-scroll  fixed ">
        <div className="w-full h-[150vh] flex justify-center items-center relative">
          <p className="Hero-heading text-[7vw] text-white">Placement Assist</p>
          <div className="absolute top-[120vh] right-1/3 translate-x-1/2">
            <p className="text-[1vw]">Want to clear Interview for your exam</p>
            <p className="text-[1vw]">But couldn't</p>
          </div>
          <div className="absolute top-[calc(150vh-300px)] left-0 ">
            <img src="RobotTalk.png" alt="Talk" width="500px" />
          </div>
        </div>
        <div className="SHADOWS">
          <div className="absolute top-[120vh] right-14 bg-[#4E00B0] blur-[120px] w-10 h-10">
            fdaf
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
