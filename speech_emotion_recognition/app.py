import tensorflow as tf
import librosa
import numpy as np
import sounddevice as sd
import queue
import threading
import time

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
    global analysis_running
    while analysis_running:
        try:
            audio_data = audio_queue.get()
            mfcc_features = extract_mfcc(audio_data, sr=22050)  # Assuming sample rate is 22050
            mfcc_features = mfcc_features.reshape(1, -1)
            prediction = model.predict(mfcc_features)
            # Get the index of the class with the highest probability
            predicted_class_index = np.argmax(prediction)
            # Get the predicted class label
            predicted_class_label = class_labels[predicted_class_index]
            # Print the predicted class label
            print("Predicted emotion:", predicted_class_label)
        except queue.Empty:
            pass

def start_analysis():           ##Gupta tere kaam ke function for start
    global analysis_running
    if not analysis_running:
        analysis_running = True
        threading.Thread(target=predict_emotion).start()
        threading.Thread(target=analyze_audio).start()
    else:
        print("Analysis is already running.")

def stop_analysis():                ###function for stop
    global analysis_running
    if analysis_running:
        analysis_running = False
    else:
        print("Analysis is not running.")

# Example usage:
start_analysis() 
time.sleep(100)
stop_analysis()