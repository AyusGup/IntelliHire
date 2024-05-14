import { useState, createContext, useContext, useEffect } from "react";

const userContext = createContext(null);


const UserProvider = (props) => {
  const [profile, setProfile] = useState({
    token:"",
    userName:""
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if(token){
      let profile = JSON.parse(token);
      setProfile({
        token: profile.token,
        userName: profile.userName,
        expiresIn: profile.expiresIn
      });
    }

    if(profile.token){
      localStorage.setItem("token", JSON.stringify(profile));
    }
  }, [token, profile]); 

  return (
    <userContext.Provider value={[profile,setProfile]}>
      {props.children}
    </userContext.Provider>
  );
};

const useUser = () => useContext(userContext);

export {useUser,UserProvider};
