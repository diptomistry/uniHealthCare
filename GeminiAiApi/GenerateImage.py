from flask import Flask, request, jsonify, send_file
import requests
import io
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS to allow cross-origin requests from your frontend

API_URL = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell"
headers = {"Authorization": "Bearer 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"}

def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.content

@app.route('/generate-image', methods=['POST'])
def generate_image():
    data = request.json  # Get the JSON data from the request
    inputs = data.get('inputs')  # Extract the 'inputs' field from the request

    # Query the Hugging Face model with the inputs
    image_bytes = query({"inputs": inputs})

    # Open the image from the byte data
    image = Image.open(io.BytesIO(image_bytes))

    # Save the generated image as a PNG file
    image.save('generated_image.png')

    # Send the generated image back to the client
    return send_file('generated_image.png', mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)
