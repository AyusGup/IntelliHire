from flask import Flask,jsonify,request
from flask_cors import CORS
from app import get_response
from Facial_emotion_detection.app import start_api
from Facial_emotion_detection.app import stop_api

import os
# Define the directory path
directory = '../Facial_emotion_detection/'

# List the contents of the directory
contents = os.listdir(directory)

app = Flask(__name__)
CORS(app)


idx= 0  # Initialize the index variable to 0

@app.route('/', methods=['POST'])
def receive_blob():
    global idx  # Access the global index variable
    print(request)
    if 'blob' in request.files:
        merged_blob = request.files['blob']
        # Save the received Blob data to a file with the incremented index
        with open(f'received_recording{idx}.webm', 'wb') as f:
            f.write(merged_blob.read())
        idx += 1  # Increment the index for the next call
        return 'Blob received and saved successfully', 200
    else:
        return 'No Blob data received', 400




@app.post('/predict')
def predict():
    if 'pdf_file' not in request.files:
        return 'No file part', 400

    pdf_file = request.files['pdf_file']
    text_data = request.form.get('text_data')
    print(pdf_file.filename, text_data)
    # Call a function and pass text and PDF data as parameters
    result = get_response(pdf_file, text_data)
    print(result)
    # Return the result
    return result


if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)
