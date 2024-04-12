import { useState, createContext, useContext } from "react";

const userContext = createContext(null);


const UserProvider = (props) => {
  const [profile, setProfile] = useState({
    token:"",
    userName:""
  });

  return (
    <userContext.Provider value={[profile,setProfile]}>
      {props.children}
    </userContext.Provider>
  );
};

const useUser = () => useContext(userContext);

export {useUser,UserProvider};
