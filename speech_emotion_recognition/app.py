from flask import Flask, jsonify
from flask_cors import CORS
import tensorflow as tf
import librosa
import numpy as np
import sounddevice as sd
import queue
import threading
import time

app = Flask(__name__)
CORS(app)

average_probability=0
# Load the pre-trained model
model = tf.keras.models.load_model("your_model_name.h5")

# Assuming you have class labels and their corresponding indices
class_labels = ['angry', 'disgust', 'fear', 'happy', 'neutral', 'pleasant', 'sad']

# Global variables to control the analysis
analysis_running = False

# Queue for communication between threads
audio_queue = queue.Queue()

def extract_mfcc(audio_data, sr):
    mfcc = np.mean(librosa.feature.mfcc(y=audio_data, sr=sr, n_mfcc=40).T, axis=0)
    return mfcc

# Define a function to process audio from the microphone and make predictions
def predict_emotion():
    global analysis_running
    duration = 3  # Duration of recording in seconds
    sr = 22050  # Sample rate
    while analysis_running:
        try:
            print("Recording...")
            # Record audio from the microphone
            audio_data = sd.rec(int(duration * sr), samplerate=sr, channels=1, dtype='float32')
            sd.wait()  # Wait until recording is finished
            # Put the recorded audio data into the queue
            audio_queue.put(audio_data[:, 0])
        except KeyboardInterrupt:
            print("\nAnalysis stopped.")
            break

def analyze_audio():
    global average_probability
    global analysis_running
    avg_prob = 0
    count = 0
    while analysis_running:
        try:
            audio_data = audio_queue.get()
            mfcc_features = extract_mfcc(audio_data, sr=22050)  # Assuming sample rate is 22050
            mfcc_features = mfcc_features.reshape(1, -1)
            prediction = model.predict(mfcc_features)
            # Get the probabilities of 'happy', 'neutral', and 'pleasant' classes
            happy_prob = prediction[0][3]  # Probability of 'happy'
            neutral_prob = prediction[0][4]  # Probability of 'neutral'
            pleasant_prob = prediction[0][5]  # Probability of 'pleasant'
            # Calculate the average probability
            avg_prob = (avg_prob * count + (happy_prob + neutral_prob + pleasant_prob)) / (count + 1)
            count += 1
            average_probability=avg_prob
            analysis_running
        except queue.Empty:
            pass

def start_analysis():
    global analysis_running
    if not analysis_running:
        analysis_running = True
        threading.Thread(target=predict_emotion).start()
        threading.Thread(target=analyze_audio).start()
    else:
        print("Analysis is already running.")

def stop_analysis():
    global analysis_running
    if analysis_running:
        analysis_running = False
    else:
        print("Analysis is not running.")



@app.route('/start', methods=['GET'])
def start():
    start_analysis()
    print("Voice processing started.")
    return "Voice processing started."

@app.route('/stop', methods=['GET'])
def stop():
    stop_analysis()
    return average_probability

# print("Average probability:", average_probability)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=5001)
