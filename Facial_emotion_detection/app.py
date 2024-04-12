from flask import Flask,jsonify,request
from flask_cors import CORS
import cv2
from deepface import DeepFace
import time
import threading
import streamlit as st

# Global variables
ans=0
processing_flag = 0
cap = cv2.VideoCapture(0)  # Use 0 for the default camera, or change to the appropriate index for multiple cameras

app = Flask(__name__)
CORS(app)

def process_frame(frame):
    try:
        predictions = DeepFace.analyze(frame, actions=["emotion"], enforce_detection=False)
        total_confidence = 0
        for prediction in predictions:
            global ans
            total_confidence += (prediction["face_confidence"])
            if len(prediction):
                ans=total_confidence / len(predictions)
        return total_confidence / len(predictions) if len(predictions) > 0 else 0
    except ValueError:
        print("Face could not be detected in the frame.")
        return 0

def process_live_video():
    global processing_flag
    global cap
    frame_count = 0  # Initialize frame count
    while processing_flag == 1:
        ret, frame = cap.read()
        if not ret:
            print("Error: Failed to capture frame.")
            break
        # Process the frame
        confidence = process_frame(frame)
        print("Face confidence for this frame:", confidence)
        
    cap.release()
    cv2.destroyAllWindows()


def start_video_processing():
    global processing_flag
    processing_flag = 1
    process_live_video()



def stop_video_processing():
    global processing_flag 
    processing_flag = 0  
    print("Video processing stopped.")
    time.sleep(10)
    processing_flag=1

def start_api():
    start_thread = threading.Thread(target=start_video_processing)
    start_thread.start()

def stop_api():
    stop_thread = threading.Thread(target=stop_video_processing)
    stop_thread.start()
    return ans

<<<<<<< HEAD

# Streamlit UI
st.title("Face Emotion Analysis")

if st.button("Start Processing"):
    start_api()
    time.sleep(20)
    stop_api()
    
=======
@app.get('/start')
def start():
    start_api()
    return "Video processing started."

@app.get('/stop')
def start():
    stop_api()
    return "Video processing stoped."

>>>>>>> 17a0c83ec933326962d716cfa2f5239f9df35d60
