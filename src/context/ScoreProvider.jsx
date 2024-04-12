import { useState, createContext, useContext } from "react";

const ScoreContext = createContext(null);


const ScoreProvider = (props) => {
  const [score, setScore] = useState(null);

  return (
    <ScoreContext.Provider value={[score, setScore]}>
      {props.children}
    </ScoreContext.Provider>
  );
};

const useScore = () => useContext(ScoreContext);

export {useScore, ScoreProvider};
