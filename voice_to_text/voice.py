import speech_recognition as sr
import pyttsx3 

# Global variable to store transcription
transcription = ""

# Initialize the recognizer 
r = sr.Recognizer() 

# Function to convert text to speech
def SpeakText(command):
    # Initialize the engine
    engine = pyttsx3.init()
    engine.say(command) 
    engine.runAndWait()

# Function to start listening and transcription
def start_listening():
    global transcription
    # Infinite loop to continuously listen for user input
    while True:    
        # Exception handling to handle runtime exceptions
        try:
            # Use the microphone as the source for input
            with sr.Microphone() as source:
                # Adjust for ambient noise
                r.adjust_for_ambient_noise(source, duration=0.2)
                print("Listening...")            
                # Listen for the user's input 
                audio = r.listen(source)
                print("Recognizing...")            
                # Using Google to recognize audio
                MyText = r.recognize_google(audio)
                MyText = MyText.lower()
                print("You said:", MyText)
                # Store the transcription
                transcription += MyText + "\n"  # Append the new transcription

        except sr.RequestError as e:
            print("Could not request results; {0}".format(e))

        except sr.UnknownValueError:
            print("Unknown error occurred")

# Function to stop listening
def stop_listening():
    global transcription
    return transcription  # Return the accumulated transcription

# Example usage:
# Start listening
start_listening()
# To stop listening, call stop_listening() from another part of your code or API
# Retrieve the accumulated transcription
accumulated_transcription = stop_listening()
print("Accumulated Transcription:\n", accumulated_transcription)
