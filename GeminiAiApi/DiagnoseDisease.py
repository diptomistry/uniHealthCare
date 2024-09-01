from flask import Flask, request, jsonify
import os
import google.generativeai as genai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Set your API key
os.environ["GEMINI_API_KEY"] = "AIzaSyCSsXdxWN3sI4JLz-I0vxDh9Py1oyN314Y"

genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Create the model configuration
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

# Initialize the model
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
    system_instruction=(
        "The user will provide you with symptoms and a list of available departments. "
        "Your task is to suggest the appropriate department based on the symptoms provided. "
        "If the user inputs unnecessary or irrelevant information that is not related to a health issue, "
        "prompt them to provide health-related symptoms. "
        "Your responses should be limited to one of two things: "
        "1. Suggest the corresponding department based on the health issue provided. "
        "2. If irrelevant data is provided, ask the user to submit health-related symptoms."
    ),
)

@app.route('/diagnose', methods=['POST'])
def chat():
    data = request.json
    user_input = data.get('user_input')

    if not user_input:
        return jsonify({"error": "Input message is required."}), 400

    chat_session = model.start_chat(
        history=[
            {
                "role": "user",
                "parts": [
                    "You will receive symptoms and a list of available departments. "
                    "Your job is to suggest the appropriate department based on the symptoms. "
                    "If the input is irrelevant to health issues, ask the user to provide health-related symptoms."
                ],
            },
            {
                "role": "model",
                "parts": [
                    "Understood, I'm ready. Please provide the symptoms and available departments.\n",
                ],
            },
        ]
    )

    response = chat_session.send_message(user_input)
    return jsonify({"response": response.text})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
