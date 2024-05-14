import React, { useRef, useEffect } from 'react';

function WebcamStream() {
  const videoRef = useRef(null);
  let sendFrameInterval;
  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.addEventListener('loadedmetadata', () => {
            videoRef.current.play();
            sendFrameInterval = setInterval(sendFrame, 3000); // Send frame data every 2 seconds
          });
        }
      } catch (err) {
        // console.error('Error accessing webcam:', err);
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
      videoRef.current.removeEventListener('loadedmetadata', () => {});
      clearTimeout(sendFrameInterval);
      console.log("removed webcam");
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
      // requestAnimationFrame(sendFrame);
    }
  };

  const sendDataViaAPI = (frameData) => {
    fetch('https://w8mx4nrj-5002.inc1.devtunnels.ms/process_frame', {
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
      // console.log('Frame data sent successfully');
    })
    .catch(error => {
      console.error('Error sending frame data:', error);
    });
  };

  return <video ref={videoRef} />;
}

export default WebcamStream;
