import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useReactMediaRecorder, ReactMediaRecorder } from "react-media-recorder";
import fetch from "../../helper/question";

const InterviewMEET = (props) => {
  const { postID, typeID, InterviewID } = useParams();
  const [qid, setQid] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [time, setTime] = useState(10);
  let timingInterval, qInterval;

  const handleDataAvailable = useCallback((chunk) => {
    setRecordedChunks((prevChunks) => [...prevChunks, chunk]);
  }, [recordedChunks]);

  // const {
  //   transcript,
  //   listening,
  //   resetTranscript,
  //   browserSupportsSpeechRecognition
  // } = useSpeechRecognition();
  
  const [timer, setTimer] = useState(10); // 120 seconds = 2 minutes
  
  // let {
  //   liveStream,
  //   stopRecording,
  //   startRecording,
  // } = useMediaRecorder({
  //  // recordScreen: true,
  //   blobOptions: { type: 'audio/webm' },
  //   mediaStreamConstraints: { audio: false, video: true },
  //   onStop: (blob) => {console.log(blob);},
  //   onDataAvailable: (data) => {
  //     console.log(data)
  //     handleDataAvailable(data);
  //   },
  // });
  const { status, startRecording, stopRecording, mediaBlobUrl } =
  useReactMediaRecorder({ video: true });

  async function callTheapi(recordedChunks) {
    const formData = new FormData();
    formData.append('mergedBlob', recordedChunks, 'recording.webm');
  
    try {
      const response = await axios.post('http://localhost:5000/', formData,  {headers: {
        "Content-Type": "multipart/form-data",
      },});
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function download(){
  //     const downloadLink = document.createElement('a');
  // downloadLink.href = URL.createObjectURL(mediaBlob);
  //     downloadLink.download = 'recording.webm'; // Specify the filename
  //     downloadLink.click();
    const mergedBlob = new Blob(recordedChunks, { type: 'video/webm' });
    callTheapi(mergedBlob);
  }


  // const startListening = () => {
  //   resetTranscript(); // Reset transcript
  //   setTimer(10); // Reset timer
  //   SpeechRecognition.startListening({continuous: true});
  // };

  // const stopListening = () => {
  //   SpeechRecognition.stopListening();
  // };

  // if (!browserSupportsSpeechRecognition) {
  //   return <span>Browser doesn't support speech recognition.</span>;
  // }

  const speak = (text) => {
    return new Promise((resolve) => {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => resolve(true);
      synth.speak(utterance);
    });
  };

  useEffect(() => {
    const getQ = async () => {
      try {
        const ques = await fetch(postID);

        setQuestions(ques);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    if (questions.length === 0) {
      getQ();
    }
  }, [questions]); 


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
  };

  const startInterview = () => {
    let idx = 0;
    speak(questions[0]).then((completed) => {
      if (completed) {
        console.log("Speech has finished.");
        startRecording();
        // startListening();
        console.log("Recording stopped", mediaBlobUrl);
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

    

    qInterval = setInterval(() => {
      if(idx == (questions.length - 1)) {
        clearInterval(qInterval);
      }
      stopRecording();
      // stopListening();
      // console.log("this is transcript",transcript);
      console.log("Recording stopped", mediaBlobUrl);
      speak(questions[++idx]).then((completed) => {
        if (completed) {
          console.log("Speech has finished.");
          startRecording();
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

      setQid(qid => qid+1);
    }, 20 * 1000); // time for question + answer
  }
  

  return (
    <>
      <div className="w-full h-screen bg-slate-950 m-0 p-0 z-9 flex items-center">
        {/* EXIT */}
        <button
          onClick={toggleExitOption}
          className="text-white text-lg absolute top-3 left-3"
        >
          <img src="" alt="Exit" />
        </button>

        {/* Main meet */}
        <div className="main-meet flex w-11/12 h-4/5 m-auto items-center px-auto justify-around">
          <div className="w-3/5 h-full rounded-lg bg-slate-500 ">
            <button onClick={startInterview}>start</button>
            <button onClick={() => speak(questions[qid])}>Speak</button>
            <div>{questions[qid]}</div>
          </div>
          <div id="RIGHT-SIDE-OPTIONS" className="h-full flex items-center">
            <div className="logo-meet absolute top-10 right-14 h-14 w-14 bg-slate-50">
              <img src="" alt="LOGO" />{" "}
            </div>

            {/* time and command component */}
            <div className="w-60 h-40 bg-slate-600 rounded-2xl">
              <div className="w-full h-[70%] bg-red-400 rounded-t-2xl  ">
                {time}
              </div>
              <div className="flex w-full h-[30%] justify-around rounded-b-2xl">
                <button className="h-full w-[49%] bg-slate-400 rounded-bl-2xl ">
                  Ask
                </button>
                <button className="rounded-br-2xl h-full w-[49%] bg-slate-400">
                  Next
                </button>
              </div>
            </div>

            {/* OUR_CAMERA */}
            <div className="absolute w-96 h-56 bottom-10 right-10 bg-slate-500 rounded-lg">
            
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
          <img src="" alt="Exit" />
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
              <Link to="/">Yes</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default InterviewMEET;

InterviewMEET.defaultProps = {
  QuestionTimer: 100,
};
