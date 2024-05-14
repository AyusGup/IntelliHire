import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import fetch from "../../helper/question";
import WebcamStream from "../WebStream";
import AudioStream from "../AudioStream";

const InterviewMEET = (props) => {
  const { postID, typeID, InterviewID } = useParams();
  const [qid, setQid] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [time, setTime] = useState(10);
  const [ifStart, setIfStart] = useState(false);
  let timingInterval, qInterval;
  let ans = [];

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const speak = (text) => {
    return new Promise((resolve) => {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => resolve(true);
      synth.speak(utterance);
    });
  };

  const startRecognition = () => {
    resetTranscript(); // Reset transcript
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopRecognition = () => {
    console.log("Recording stopped", transcript);
    SpeechRecognition.stopListening();
  };

  const onEnd = useCallback(() => {
    ans.push(transcript);
    console.log("Transcript:", transcript);
    resetTranscript(); // Reset transcript
  }, [transcript]);

  useEffect(() => {
    const getQ = async () => {
      try {
        const ques = await fetch(postID);

        console.log(ques);
        // axios.get(`http://localhost:5000/start`).then((res) => {
        //   console.log(res.data);
        // });

        // axios.get(`http://localhost:5001/start`).then((res) => {
        //   console.log(res.data);
        // });
        setQuestions(ques);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    if (questions.length === 0) {
      getQ();
    }

  }, [questions]);

  useEffect(() => {
    return ()=>{
      clearInterval(timingInterval);
      clearInterval(qInterval);
      window.speechSynthesis.cancel();
      window.location.reload();
    }
  }, []);

  //todo Remove the header from the meet
  const RemoveHeader = document.getElementById("layout-header");
  if (RemoveHeader) {
    console.log("Header Removed");
    RemoveHeader.style.display = "none";
  }

  //todo Toggle Exit options from where
  const [exitOption, setExitOption] = useState(false);
  const Confirmation = document.getElementById("exits-options");

  const toggleExitOption = () => {
    setExitOption(!exitOption);
    if (Confirmation)
      Confirmation.style.display = exitOption === true ? "flex" : "none";
  };

  const backToHome = () => {
    RemoveHeader.style.display = "flex";
    console.log("Back to Home");
    clearInterval(timingInterval);
    clearInterval(qInterval);
    window.speechSynthesis.cancel();
    window.location.href = "/";
  };

  const startInterview = () => {
    setIfStart(true);
    console.log("start interview");

    let idx = 1;
    startRecognition();
    speak(questions[1]).then((completed) => {
      if (completed) {
        console.log("Speech has finished.");
        //  console.log("Recording stopped", mediaBlobUrl);
        timingInterval = setInterval(() => {
          console.log("T:",transcript);
          setTime((prevTime) => {
            if (prevTime === 0) {
              clearInterval(timingInterval);
              return 10;
            }
            return prevTime - 1;
          });
        }, 1000);
      }
    });

    qInterval = setInterval(() => {
      ans.push(transcript);
      console.log("Transcript:", transcript);
      if (idx == 5) {
        clearInterval(qInterval);
        clearInterval(timingInterval);
        stopRecognition();
        idx = 1;
        setQid(1);
        setIfStart(false);
        return;
      }
      
      // resetTranscript(); 
      speak(questions[++idx]).then((completed) => {
        if (completed) {
          console.log("Speech has finished.");

          timingInterval = setInterval(() => {
            setTime((prevTime) => {
              if (prevTime === 0) {
                clearInterval(timingInterval);
                return 10;
              }
              return prevTime - 1;
            });
          }, 1000);
        }
      });

      setQid((qid) => qid + 1);
    }, 20 * 1000); // time for question + answer
  };

  useEffect(() => {
    console.log("Time:", time);
    console.log("Transcript:", transcript, ans[0]);
    if(time == 0){
      ans.push(transcript);
      console.log("Transcript:", transcript);
      resetTranscript();
    }
  }, [time]); 

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser not supported. Change your browser!</span>;
  }

  return (
    <>
      <AudioStream />
      <div className="w-full h-screen bg-slate-950 m-0 p-0 z-9 flex items-center">
        {/* EXIT */}

        <button
          onClick={toggleExitOption}
          className="text-white text-lg absolute top-3 left-3 z-10 font-extrabold"
        >
          EXIT
        </button>
        {/* Main meet */}
        <div className="main-meet flex w-11/12 h-4/5 m-auto items-center px-auto justify-around">
          <div className="w-1/3 h-1/2 min-w-[640px] min-h-[480px] rounded-2xl bg-indigo-950 text-slate-50 hover:shadow-[55px_-43px_120px_rgba(112,0,255,0.25),-74px_39px_120px_rgba(204,0,255,0.25)] border-white border-8">
            <div>{ifStart && qid<6?questions[qid] : "Best of luck for the interview!"}</div>
            <div>{ifStart? transcript : ans[1]}</div>
          </div>
          <div
            id="RIGHT-SIDE-OPTIONS"
            className="h-full flex flex-col justify-between"
          >
            <div className="logo-meet top-10 right-14 h-fit w-24 bg-slate-50 self-end">
              <img src="/intellihire.jpg" alt="LOGO" />{" "}
            </div>

            {/* time and command component */}
            <div className="w-60 h-40 bg-slate-600 rounded-2xl ">
              <div className="w-full h-[70%] bg-red-400 rounded-t-2xl justify-center text-3xl flex items-center" onClick={questions.length? startInterview: ()=>{}}>
                {ifStart? time : questions.length? "Start Interview" : "Loading Questions"}
              </div>
              <div className="flex w-full h-[30%] justify-around rounded-b-2xl">
                <button
                  className="h-full w-[49%] bg-slate-400 rounded-bl-2xl hover:bg-slate-600"
                  onClick={() => speak(questions[qid])}
                >
                  Speak Again
                </button>
                <button className="rounded-br-2xl h-full w-[49%] bg-slate-400 hover:bg-slate-600">
                  Next
                </button>
              </div>
            </div>

            {/* OUR_CAMERA */}
            <div className=" w-64 h-fit bottom-10 right-10 bg-slate-500 rounded-lg translate-x-10 translate-y-10 border-white border-3 text-wrap text-red-400 font-semibold">
              <WebcamStream />
            </div>
          </div>
        </div>
      </div>

      <div
        id="exits-options"
        className="w-full h-full backdrop-blur-lg absolute top-0 bg-[rgba(23, 23, 23, 0.44)] items-center justify-center hidden"
      >
        <button
          onClick={toggleExitOption}
          className="text-white text-lg absolute top-3 left-3"
        >
          <img src="" />
        </button>
        {/* //todo exit confirmation */}
        <div className="w-[300px] h-28 flex flex-col items-center justify-around">
          <div className="w-[299px] h-[77px] bg-slate-400 rounded-t-2xl p-2 text-center ">
            Do you want to quit the interview
          </div>
          <div className="flex w-full h-[33px] justify-around rounded-b-2xl">
            <button
              className="h-full w-[149px] bg-slate-400 rounded-bl-2xl "
              onClick={toggleExitOption}
            >
              No
            </button>
            <button
              className="rounded-br-2xl h-full w-[149px] bg-slate-400"
              onClick={backToHome}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default InterviewMEET;


