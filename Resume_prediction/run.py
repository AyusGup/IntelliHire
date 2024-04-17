from flask import Flask, request, jsonify
from flask_cors import CORS
from beem import Hive
from beem.discussions import Query, Discussions
from app import get_response
from inspect import getfullargspec


app = Flask(__name__)
CORS(app)

idx = 0  # Initialize the index variable to 0

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
    
@app.route('/process_frame', methods=['POST', 'OPTIONS'])
def process_frame():
    if request.method == 'OPTIONS':
        # Handle preflight OPTIONS request
        response = jsonify({'message': 'CORS preflight request handled'})
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response
    elif request.method == 'POST':
        # Handle POST request
        try:
            frame_data = request.json['frame']
            # Here you can process the frame data as per your requirements
            # For now, let's just print the length of the received frame data
            print("Received frame data. Length:", len(frame_data))
            # You can add your processing logic here
            # Once processed, you may want to return a response indicating success
            return jsonify({'message': 'Frame processed successfully'}), 200
        except Exception as e:
            # If any error occurs during processing, return an error response
            print("Error processing frame:", str(e))
            return jsonify({'error': 'Failed to process frame'}), 500
        
@app.route('/process_audio', methods=['POST', 'OPTIONS'])
def process_audio():
    if request.method == 'OPTIONS':
        # Handle preflight OPTIONS request
        response = jsonify({'message': 'CORS preflight request handled'})
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response
    elif request.method == 'POST':
        try:
            audio_data = request.json['audio']
            # Here you can process the audio data as per your requirements
            # For now, let's just print the length of the received audio data
            print("Received audio data. Length:", len(audio_data))
            # You can add your processing logic here
            # Once processed, you may want to return a response indicating success
            return jsonify({'message': 'Audio processed successfully'}), 200
        except Exception as e:
            # If any error occurs during processing, return an error response
            print("Error processing audio:", str(e))
            return jsonify({'error': 'Failed to process audio'}), 500


@app.route('/predict', methods=['POST'])
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

@app.route('/posts', methods=['GET'])
def get_posts():
    # Get tag from query parameters
    tag = request.args.get('tag')
    print(tag)
    # Check if tag is provided
    if not tag:
        return jsonify({'error': 'Tag parameter is required'}), 400

    try:
        # Initialize Hive, Query, and Discussions objects
        h = Hive()
        q = Query(limit=10, tag="jobs")
        d = Discussions()

        # Fetch posts based on the provided tag
        posts = d.get_discussions(tag, q, limit=10)

        # Prepare response data
        response = []
        for post in posts:
            response.append({
                'author': post['author'],
                'permlink': post['permlink'],
                'category': post['category'],
                'body': post['body']
            })
        
    except Exception as e:
        # Handle the UnhandledRPCError by returning an empty array
        response = []
    # print(response)
    return jsonify(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5002)
