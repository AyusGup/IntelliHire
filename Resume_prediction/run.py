from flask import Flask, request, jsonify
from flask_cors import CORS
from beem import Hive
from beem.discussions import Query, Discussions
from app import get_response

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
    
    # Check if tag is provided
    if not tag:
        return jsonify({'error': 'Tag parameter is required'}), 400

    # Initialize Hive, Query, and Discussions objects
    h = Hive()
    q = Query(limit=10, tag="job")
    d = Discussions()

    # Fetch posts based on the provided tag
    posts = d.get_discussions(tag, q)

    # Prepare response data
    response = []
    for post in posts:
        response.append({
            'author': post['author'],
            'permlink': post['permlink'],
            'category': post['category'],
            'body': post['body']
        })

    return jsonify(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5002)
