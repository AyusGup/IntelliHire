import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./App";
import { SocketProvider } from "./context/SocketProvider";
import { ScoreProvider } from "./context/ScoreProvider";
import { UserProvider } from "./context/userProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
  <ScoreProvider>
  <SocketProvider>
    <App />
  </SocketProvider>
  </ScoreProvider>
  </UserProvider>
);


