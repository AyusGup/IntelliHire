import React, { useRef, useEffect } from 'react';

function WebcamStream() {
  const videoRef = useRef(null);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.addEventListener('loadedmetadata', () => {
            videoRef.current.play();
            sendFrame(); // Call sendFrame once video is ready
          });
        }
      } catch (err) {
        console.error('Error accessing webcam:', err);
      }
    };

    startWebcam();

    return () => {
      // Clean up: Stop video stream when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const sendFrame = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/jpeg');
      sendDataViaAPI(imageData);
      requestAnimationFrame(sendFrame);
    }
  };

  const sendDataViaAPI = (frameData) => {
    fetch('http://localhost:5002/process_frame', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ frame: frameData })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to send frame data');
      }
      console.log('Frame data sent successfully');
    })
    .catch(error => {
      console.error('Error sending frame data:', error);
    });
  };

  return <video ref={videoRef} />;
}

export default WebcamStream;
