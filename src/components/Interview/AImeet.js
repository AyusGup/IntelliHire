import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useReactMediaRecorder } from "react-media-recorder";
import fetch from "../../helper/question";

const InterviewMEET = (props) => {
  const { postID, typeID, InterviewID } = useParams();
  const [qid, setQid] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [time, setTime] = useState(10);
  const [answers, setAnswers] = useState([]);
  let timingInterval, qInterval;

  const handleDataAvailable = useCallback((chunk) => {
    setRecordedChunks((prevChunks) => [...prevChunks, chunk]);
  }, []);

  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ video: true });

  async function callTheapi(recordedChunks) {
    const formData = new FormData();
    formData.append('mergedBlob', recordedChunks, 'recording.webm');

    try {
      const response = await axios.post('http://localhost:5000/', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function download() {
    const mergedBlob = new Blob(recordedChunks, { type: 'video/webm' });
    callTheapi(mergedBlob);
  }

  const {
    transcript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const isSpeechRecognitionSupported = browserSupportsSpeechRecognition;

  if (!isSpeechRecognitionSupported) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

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
        console.error('Error fetching questions:', error);
      }
    };

    getQ();
  }, [postID]);

  useEffect(() => {
    if (questions.length > 0) {
      startInterview();
    }
  }, [questions]);

  const startInterview = () => {
    let idx = 0;
    speak(questions[0]).then((completed) => {
      if (completed) {
        startRecording();
        SpeechRecognition.startListening({ continuous: true });
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

    const qInterval = setInterval(() => {
      if (idx === questions.length - 1) {
        clearInterval(qInterval);
      }
      stopRecording();
      SpeechRecognition.stopListening();
      speak(questions[++idx]).then((completed) => {
        startRecording();
        const timingInterval = setInterval(() => {
          setTime((prevTime) => {
            if (prevTime === 0) {
              clearInterval(timingInterval);
              return 10;
            }
            return prevTime - 1;
          });
        }, 1000);
      });

      setQid((qid) => qid + 1);
    }, 20 * 1000); // time for question + answer

    return () => clearInterval(qInterval);
  }

  return (
    <>
      <div className="w-full h-screen bg-slate-950 m-0 p-0 z-9 flex items-center">
        {/* JSX content */}
      </div>
      <div className="w-full h-full backdrop-blur-lg absolute top-0 bg-[rgba(23, 23, 23, 0.44)] items-center justify-center hidden">
        {/* JSX content */}
      </div>
    </>
  );
};

export default InterviewMEET;

InterviewMEET.defaultProps = {
  QuestionTimer: 100,
};
