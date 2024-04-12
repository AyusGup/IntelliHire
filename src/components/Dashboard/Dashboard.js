import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Dashboard = (props) => {
  const [id, setId] = useState("");
  const location = useLocation();
  const LoginBoxElement = document.getElementById("login-Box");
  if (LoginBoxElement)
    LoginBoxElement.style.display = props.visibity === true ? "block" : "none";
  // LoginBoxElement.style.display = "none";
  // console.log(props.visibity);

  return (
    <>
      <div
        className="fixed w-full h-full bg-[rgba(23, 23, 23, 0.44)] text-white p-0 top-24 backdrop-blur hidden"
        id="login-Box"
      >
        <div className="w-full h-full flex items-center justify-center">
          <form className="flex flex-col space-y-4">
            <div className="flex">
              <label htmlFor="id" className="text-3xl">
                @
              </label>
              <input
                type="text"
                placeholder="Enter your hive username"
                value={id}
                onChange={(e) => {
                 // console.log(e.target.value);
                  setId(e.target.value);
                }}
                className="p-2 m-2 text-black"
              />
            </div>
            <button type="submit">Login with Hive</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Dashboard;

Dashboard.defaultProps = {
  visibity: false,

};
