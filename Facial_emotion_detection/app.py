from flask import Flask, jsonify
from flask_cors import CORS
import cv2
from deepface import DeepFace
import threading

# Global variables
processing_flag = 0
cap = cv2.VideoCapture(0)  # Use 0 for the default camera, or change to the appropriate index for multiple cameras

app = Flask(__name__)
CORS(app)

# Global variables
processing_flag = threading.Event()  # Using threading event instead of a simple flag
processing_flag.set()  # Set the event initially to indicate processing is allowed

cap = cv2.VideoCapture(0)  # Use 0 for the default camera, or change to the appropriate index for multiple cameras

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
    while processing_flag.is_set():  # Check if processing is allowed
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
    processing_flag.set()  # Set the event to indicate processing is allowed
    process_live_video()

def stop_video_processing():
    global processing_flag
    processing_flag.clear()  # Clear the event to indicate processing is not allowed
    print("Video processing stopped.")

def start_api():
    global processing_flag
    if not processing_flag.is_set():  # Check if processing is already started
        print("Video processing is already started.")
        return
    
    start_thread = threading.Thread(target=start_video_processing)
    start_thread.start()
    # start_video_processing()
    print("Video processing started.")

def stop_api():
    global processing_flag
    if not processing_flag.is_set():  # Check if processing is already stopped
        print("Video processing is already stopped.")
        return
    
    stop_thread = threading.Thread(target=stop_video_processing)
    stop_thread.start()

@app.route('/start', methods=['GET'])
def start():
    start_api()

    return "Video processing started."

@app.route('/stop', methods=['GET'])
def stop():
    stop_api()
    return "Video processing stopped."



if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False)
