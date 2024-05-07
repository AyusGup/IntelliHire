// import React, { useEffect, useState } from "react";
// import { useLocation } from 'react-router-dom';
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useUser } from "../../context/userProvider";
import { motion } from "framer-motion";
import axios from "axios";

import SparklesPreview from "./landing";
import MacbookScrollDemo from "./mackbook";
import StickyScrollRevealDemo from "./scroll-info";
import { AnimatedTooltipPreview } from "./Team";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const access_token = searchParams.get("access_token");
  const username = searchParams.get("username");
  const expires_in = searchParams.get("expires_in");
  const [profile, setProfile] = useUser();

  useEffect(() => {
    if (access_token && username && expires_in) {
      setProfile({
        token: access_token,
        userName: username,
        expiresIn: expires_in,
      });

      fetch(
        `https://intellihire-4shu.onrender.com/callback?access_token=${access_token}&username=${username}`,
        {
          method: "GET",
        }
      )
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.error("Error:", error));

      // axios.post(`https://intellihire-4shu.onrender.com/setScore?token=${access_token}&username=${username}`,{
      //   username : "abhimanyu-jha",
      //   faceScore : 10,
      //   resumeScore : 8,
      //   speechScore : 6,
      //   generalScore: 8
      // })
      // .then((data) => {console.log(data)})
      // .then(data => {
      //   console.log(data)
      // })
      // .catch(error => console.error('Error:', error));
    }
  }, [access_token, username, expires_in]);

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
      <SparklesPreview />
      <MacbookScrollDemo />
      <div className="flex w-full justify-around bg-black items-center flex-wrap">
        <p className=" text-white text-wrap font-bold xl:text-7xl md:text-5xl sm:text-4xl max-[640px]:text-4xl">
          Our <br />
          Benefits
        </p>
        <StickyScrollRevealDemo />
      </div>
      <div className="py-20 mx-auto w-full text-center bg-black">
        <p className=" text-white text-wrap font-bold xl:text-7xl md:text-5xl sm:text-4xl max-[640px]:text-4xl py-10">
          {" "}
          Our Team
        </p>
        <AnimatedTooltipPreview />
      </div>
    </>
  );
}

export default Home;
