import React, { useEffect, useRef } from 'react';

function MicrophoneStream() {
  const audioDataRef = useRef(null);
  let stream, audioContext, scriptNode, microphone;
  let audiInterval;

  useEffect(() => {
    const startMicrophone = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new AudioContext();
        microphone = audioContext.createMediaStreamSource(stream);
        
        scriptNode = audioContext.createScriptProcessor(2048, 1, 1); // Create ScriptProcessorNode
        scriptNode.onaudioprocess = handleAudioProcess; // Set event listener for audio process
        
        microphone.connect(scriptNode);
        scriptNode.connect(audioContext.destination);

        audiInterval = setInterval(sendAudioData, 3000); // Send audio data every 3 seconds
      } catch (err) {
        console.error('Error accessing microphone:', err);
      }
    };

    startMicrophone();

    return () => {
      if (audioContext && scriptNode && microphone) {
        scriptNode.disconnect(audioContext.destination);
        microphone.disconnect();
        stream.getTracks().forEach(track => track.stop());
        clearInterval(audiInterval);
      }
    };

  }, []);

  const handleAudioProcess = (audioProcessingEvent) => {
    const inputBuffer = audioProcessingEvent.inputBuffer;
    const inputData = inputBuffer.getChannelData(0);
    
    const encodedData = encodeAudioData(inputData);
    if (encodedData) { // Check if audio data is not empty
      audioDataRef.current = encodedData;
    }
  };

  const sendAudioData = () => {
    const audioData = audioDataRef.current;
    if (audioData) { // Check if audio data is not empty
      sendDataViaAPI(audioData);
    }
  };

  const encodeAudioData = (audioData) => {
    const byteArray = new Float32Array(audioData.length);
    for (let i = 0; i < audioData.length; i++) {
      byteArray[i] = audioData[i];
    }
    const pcmEncodedData = btoa(String.fromCharCode.apply(null, new Uint8Array(byteArray.buffer)));
    return pcmEncodedData;
  };

  const sendDataViaAPI = (audioData) => {
    fetch('http://localhost:5002/process_audio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ audio: audioData })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to send audio data');
      }
      // console.log('Audio data sent successfully');
    })
    .catch(error => {
      console.error('Error sending audio data:', error);
    });
  };

  return <></>;
}

export default MicrophoneStream;
