import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import { useUser } from "../../context/userProvider";

const Header = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [user, setUser] = useUser();

  const callHiveSigner = () => {
    fetch("https://intellihire-4shu.onrender.com/login", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.href = data.url;
      })
      .catch((error) => console.error("Error:", error));
  };

  const revokeHiveSigner = () => {
    console.log("revoke");
    fetch("https://intellihire-4shu.onrender.com/logout", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.href = data.url;
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <div
        className="w-full h-20 bg-black top-0 flex p-5 justify-between items-center text-center fixed z-9"
        id="layout-header"
      >
        <div>
          <img src="/Logo.png" alt="Logo" width="150px" />
        </div>
        <div className="w-fit h-full flex text-white gap-[3vw] px-3 font-bold">
          <div>
            <Link to="/">HOME </Link>
          </div>
          <div>
            <Link to="/Resume"> Resume</Link>
          </div>
          <div>
            <Link to="/Interview">Interview </Link>
          </div>

          {user.token === "" ? (
            <div onClick={callHiveSigner}>Login</div>
          ) : (
            <div>
              <Link to="/Profile">Profile</Link>
            </div>
          )}
        </div>
      </div>
      <Dashboard visibity={loginVisible} />
    </>
  );
};

export default Header;
