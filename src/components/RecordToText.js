import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import AudioStream from './AudioStream';
import WebcamStream from './WebStream';

const SpeechToTextAndStreams = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [timer, setTimer] = useState(120); // 120 seconds = 2 minutes

  const startRecognition = () => {
    resetTranscript(); // Reset transcript
    setTimer(120); // Reset timer
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopRecognition = () => {
    SpeechRecognition.stopListening();
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className='m-32'>
      <WebcamStream />
      <AudioStream />
      <button onClick={startRecognition}>Start Listening</button>
      <button onClick={stopRecognition}>Stop Listening</button>
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default SpeechToTextAndStreams;
