import "./App.css";
import Home from "./components/Home/Home";
import Header from "./components/Layout/header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Interview from "./components/Interview/Interview";
import Resume from "./components/Resume/Resume";
import Dashboard from "./components/Dashboard/Dashboard";
import CompleteReview from "./components/Interview/CompleteInterview";
import InterviewMEET from "./components/Interview/AImeet";
import ResumeScore from "./components/Resume/ResumeScore";
import ManualInterviewMEET from "./components/Interview/ManualMeet";
import LobbyScreen from "./screens/Lobby";
import Profile from "./components/Dashboard/profile";
import Interviewer from "./components/Interview/Interviewer";
import Dictaphone from "./components/Interview/temp";
import CompanyDashboard from "./components/Dashboard/CompanyDashboard";
import PostOutput from "./components/Post/output";
import PostInput from "./components/Post/input";
import WebcamStream from "./components/WebStream";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Profile" element={<Profile />} />
          <Route exact path="/Resume" element={<Resume />} />
          <Route exact path="/Interview" element={<Interview />} />
          <Route
            extact
            path="/Interview/Details/:postID/:typeID/:selectedItem/:InterviewID"
            element={<InterviewMEET />}
          />
          <Route
            extact
            path="/Interview/Details/:postID/:typeID/ManualInterviewer/mylobby/online"
            element={<LobbyScreen />}
          />
          <Route extact path="/faltu" element={<Dictaphone />} />
          <Route extact path="/faltu" element={<Dictaphone />} />
          <Route
            extact
            path="/Interview/Details/:postID/:typeID/ManualInterviewer/mylobby/bot"
            element={<InterviewMEET />}
          />
          <Route extact path="/company" element={<CompanyDashboard />} />
          <Route
            extact
            path="/Interview/Details/:postID/:typeID/ManualInterviewer/:InterviewID/online/candidate/room/:roomID"
            element={<ManualInterviewMEET />}
          />
          <Route
            extact
            path="/Interview/Details/:postID/:typeID/ManualInterviewer/:InterviewID/online/interviewer/room/:roomID"
            element={<Interviewer />}
          />
          <Route
            exact
            path="/Resume/ResumeScore/:ResumeSubmissionID"
            element={<ResumeScore />}
          />
          <Route
            exact
            path="/post"
            element={<PostOutput />}
          />
          <Route
            exact
            path="/inputPost"
            element={<PostInput />}
          />
          <Route
            exact
            path="/Complete-Interview"
            element={<CompleteReview />}
          />
          <Route exact path="/Dashboard" element={<Dashboard />} />
          <Route exact path="/Interviewer" element={<Interviewer />} />
          <Route exact path="/webstream" element={<WebcamStream />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
