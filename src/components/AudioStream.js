import React, { useEffect, useRef } from 'react';

function MicrophoneStream() {
  const audioDataRef = useRef(null);

  useEffect(() => {
    const startMicrophone = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new AudioContext();
        const microphone = audioContext.createMediaStreamSource(stream);
        
        const processAndSendAudio = () => {
          const bufferSize = 2048;
          const scriptNode = audioContext.createScriptProcessor(bufferSize, 1, 1);
          
          scriptNode.onaudioprocess = function(audioProcessingEvent) {
            const inputBuffer = audioProcessingEvent.inputBuffer;
            const inputData = inputBuffer.getChannelData(0);
            
            const encodedData = encodeAudioData(inputData);
            if (encodedData) { // Check if audio data is not empty
              sendDataViaAPI(encodedData);
            }
          };
      
          microphone.connect(scriptNode);
          scriptNode.connect(audioContext.destination);
        };
        
        processAndSendAudio();
      } catch (err) {
        console.error('Error accessing microphone:', err);
      }
    };

    startMicrophone();

    return () => {
      // Clean up: Stop microphone stream when component unmounts
      // You may need to add cleanup logic here if necessary
    };
  }, []);

  const encodeAudioData = (audioData) => {
    const byteArray = new Float32Array(audioData.length);
    for (let i = 0; i < audioData.length; i++) {
      byteArray[i] = audioData[i];
    }
    const pcmEncodedData = btoa(String.fromCharCode.apply(null, new Uint8Array(byteArray.buffer)));

    return pcmEncodedData;
  };

  const sendDataViaAPI = (audioData) => {
    if (audioData && audioData !== audioDataRef.current) { // Check if audio data is not empty and not the same as the previous data
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
        console.log('Audio data sent successfully');
      })
      .catch(error => {
        console.error('Error sending audio data:', error);
      });

      audioDataRef.current = audioData; // Update audio data ref
    }
  };

  return <div>Microphone Stream</div>;
}

export default MicrophoneStream;
