import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [timer, setTimer] = useState(120); // 120 seconds = 2 minutes

  useEffect(() => {
    let interval;
    if (listening) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000); // Update timer every second
    }

    return () => {
      clearInterval(interval);
    };
  }, [listening]);

  useEffect(() => {
    if (timer === 0) {
      SpeechRecognition.stopListening();
    }
  }, [timer]);

  const startListening = () => {
    resetTranscript(); // Reset transcript
    setTimer(120); // Reset timer
    SpeechRecognition.startListening({continuous: true});
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      {listening && <p>Time remaining: {timer} seconds</p>}
      <button onClick={startListening}>Start</button>
      <button onClick={stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};

export default Dictaphone;