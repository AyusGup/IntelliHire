import React, { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";

const Header = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const { access_token, username } = useParams();

  console.log(access_token, username)
  const callHiveSigner = async() => {
    await axios.get("https://490bj8xz-3001.inc1.devtunnels.ms/login").then((res) => {
      console.log(res.data);
      window.location.href = res.data;
    });
  };

  return (
    <>
      <div
        className="w-full h-20 bg-black top-0 flex p-5 justify-between items-center text-center fixed z-9"
        id="layout-header"
      >
        <div>
          <img src="/Logo.png" alt="Logo" width="180px" />
        </div>
        <div className="w-fit h-full flex text-white gap-6 px-3">
          <div>
            <Link to="/">HOME </Link>
          </div>
          <div>
            <Link to="/Resume"> Resume</Link>
          </div>
          <div>
            <Link to="/Interview">Interview </Link>
          </div>
          <div>
            <Link to="/Complete-Interview">Preplacement </Link>
          </div>
          <button onClick={callHiveSigner}>
            {/* <Link to="/Dashboard">Login </Link> */}
            Login
          </button>
        </div>
      </div>
      <Dashboard visibity={loginVisible} />
    </>
  );
};

export default Header;
