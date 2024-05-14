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
import AudioStream from "./components/AudioStream";
import SpeechToText from "./components/RecordToText";
import Protection from "./components/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route path="/Profile" element={<Protection />} >
            <Route path="" element={<Profile />} />
          </Route>

          <Route path="/Resume" element={<Protection />} >
            <Route exact path="" element={<Resume />} />
            <Route
              exact
              path="/ResumeScore/:ResumeSubmissionID"
              element={<ResumeScore />}
            />
          </Route>

          <Route path="/Interview" element={<Protection />} >
            <Route exact path="" element={<Interview />} />
            <Route
              exact
              path="Details/:postID/:typeID/:selectedItem/:InterviewID"
              element={<InterviewMEET />}
            />
            <Route
              extact
              path="Details/:postID/:typeID/ManualInterviewer/mylobby/online"
              element={<LobbyScreen />}
            /> 
            <Route
              extact
              path="Details/:postID/:typeID/ManualInterviewer/mylobby/bot"
              element={<InterviewMEET />}
            />
            <Route
              extact
              path="Details/:postID/:typeID/ManualInterviewer/:InterviewID/online/candidate/room/:roomID"
              element={<ManualInterviewMEET />}
            />
            <Route
              extact
              path="Details/:postID/:typeID/ManualInterviewer/:InterviewID/online/interviewer/room/:roomID"
              element={<Interviewer />}
            />
          </Route>
          
          <Route path="/Interviewer" element={<Protection />} >
            <Route exact path="" element={<Interviewer />} />
          </Route>

          <Route path="/Dashboard" element={<Protection />} >
            <Route exact path="" element={<Dashboard />} />
          </Route>
          
          <Route extact path="/faltu" element={<Dictaphone />} />
          <Route extact path="/faltu" element={<Dictaphone />} />
          
          <Route extact path="/company" element={<CompanyDashboard />} />
          
          
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
          
          <Route exact path="/webstream" element={<WebcamStream />} />
          <Route exact path="/audiostream" element={<AudioStream />} />
          <Route exact path="/recordtotext" element={<SpeechToText />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
