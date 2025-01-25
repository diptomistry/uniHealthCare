from flask import Flask, request, jsonify, send_file
import requests
import io
from PIL import Image
from flask_cors import CORS
import google.generativeai as genai
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for the entire app

# Hugging Face API for Image Generation
API_URL = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell"
headers = {"Authorization": "Bearer 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"}

# Set the API key for Google Generative AI
os.environ["GEMINI_API_KEY"] = "AIzaSyCeLqq9CEBo8PNRMtCc68SQRQwu8Tgn4co"
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Model configuration for Google Generative AI
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

# Hugging Face Query Function
def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.content

# Route 1: Hugging Face Image Generation
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

# Create the Google Generative AI Model
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)

# Route 2: Text Improvement using Google Generative AI
@app.route('/improve-text', methods=['POST'])
def improve_text():
    data = request.json
    input_text = data.get('text', '')

    # Start a chat session
    chat_session = model.start_chat(
    history=[
        {
        "role": "user",
        "parts": [
            "user will give you some texts .you will improve it if there is any kind of error like grammar error, misspelling , lack of proper  spacing ,punctuation marks ,capitalization etc. dont say anything like : 'this text is grammatically correct and clear! However, if you'd like to make it sound a bit more formal, you could say'  .just improve the text if needed ,otherwise  keep it as it was\n",
        ],
        },
        {
        "role": "model",
        "parts": [
            "Please provide me with the text you would like me to review. I will do my best to identify and correct any errors in grammar, spelling, spacing, punctuation, and capitalization. \n",
        ],
        },
    ]
    )


    response = chat_session.send_message(input_text)

    return jsonify({'corrected_text': response.text})

# Route 3: Medical Advice Chatbot using Google Generative AI
@app.route('/api/ask', methods=['POST'])
def ask_medical_advice():
    try:
        user_message = request.json.get('message')

        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        # Start a chat session
        chat_session = model.start_chat(
        history=[
            {
            "role": "user",
            "parts": [
                "user will ask for health advice . you will just answer it . your are a doctor for him. if you the user say irrelevant things don't answer it . Ask to say health related questions. And answer in one paragraph don't use any bullet point, asterisk type things ,just texts.\n When suggesting the user to get advice from doctor, say : ' please consult with a medical professional , you can get free treatment from Dhaka University Medical Center'\n",
            ],
            },
            {
            "role": "model",
            "parts": [
                "Please tell me about your health concerns. I'm here to help. 😊 \n",
            ],
            },
        ]
        )

        # Send the user message to the model
        response = chat_session.send_message(user_message)

        return jsonify({"response": response.text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route 4: Department Suggestion Based on Symptoms
@app.route('/diagnose', methods=['POST'])
def diagnose():
    data = request.json
    user_input = data.get('user_input')
    print(user_input)
    if not user_input:
        return jsonify({"error": "Input message is required."}), 400

    # Start a chat session for diagnosing
    chat_session = model.start_chat(
    history=[
        {
        "role": "user",
        "parts": [
            " You will receive patient symptoms and a list of available departments.  Your job is to suggest the appropriate department based on the symptoms. You will just say the department name, nothing redundant. If the input is irrelevant to health issues, request the user to provide health-related symptoms.\n Your responses should be limited to one of two things: \n 1. Suggest the corresponding department from the list of available departments based on the health issue provided. \n 2. If irrelevant data is provided, ask the user to submit health-related symptoms.\n\n",
        ],
        },
        {
        "role": "model",
        "parts": [
            "Okay, I'm ready. Please provide the patient symptoms and the list of available departments. \n",
        ],
        },
        {
        "role": "user",
        "parts": [
            "Patient symptoms: leg broken Department List: Cardiology, Medicine, Eye care, ENT, Dentistry",
        ],
        },
        {
        "role": "model",
        "parts": [
            "Orthopedics \n",
        ],
        },
        {
        "role": "user",
        "parts": [
            "i said to suggest department from the provided list, never ever suggest department that is not available",
        ],
        },
        {
        "role": "model",
        "parts": [
            "You are absolutely right! I apologize for that mistake. I am still under development and learning.  \n\nSince \"Orthopedics\" is not on the provided list, I cannot suggest a department. \n\nPlease provide the patient's symptoms and the list of available departments again. I will do my best to suggest the correct department from the list. \n",
        ],
        },
        {
        "role": "user",
        "parts": [
            "Patient symptoms: leg broken Department List: Cardiology, Medicine, Eye care, ENT, Dentistry",
        ],
        },
        {
        "role": "model",
        "parts": [
            "Medicine \n",
        ],
        },
    ]
    )

    response = chat_session.send_message(user_input)
    return jsonify({"response": response.text})

# Start the Flask app
if __name__ == '__main__':
    app.run(debug=True, port=5001)
