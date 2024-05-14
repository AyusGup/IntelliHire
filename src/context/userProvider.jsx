import { useState, createContext, useContext, useEffect } from "react";

const userContext = createContext(null);


const UserProvider = (props) => {
  const [profile, setProfile] = useState({
    token:"",
    userName:""
  });

  const token = localStorage.getItem("token");
  const now = new Date();

  useEffect(() => {
    if(token){
      if (now.getTime() >= token.expiresIn) {
        // If the item is expired, delete the item from storage
        // and return null
        localStorage.removeItem(token);
        return ;
      }

      let profile = JSON.parse(token);
      setProfile({
        token: profile.token,
        userName: profile.userName,
        expiresIn: profile.expiresIn
      });
    }
    else if(profile.token){
      localStorage.setItem("token", JSON.stringify({
        ...profile,
        expiresIn: now.getTime() + profile.expiresIn
      }));
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
