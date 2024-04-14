import speech_recognition as sr
import pyttsx3

# Initialize the recognizer
r = sr.Recognizer()

# Function to convert text to speech
def speak_text(command):
    # Initialize the engine
    engine = pyttsx3.init()
    engine.say(command)
    engine.runAndWait()

# Function to listen to one input and return transcription
def listen_once():
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
            my_text = r.recognize_google(audio)
            my_text = my_text.lower()
            print("You said:", my_text)
            return my_text

    except sr.RequestError as e:
        print("Could not request results; {0}".format(e))
        return ""

    except sr.UnknownValueError:
        print("Sorry, I couldn't understand what you said. Please try again.")
        return ""

# Example usage:
# Start listening
transcription = listen_once()
print("Transcription:\n", transcription)
