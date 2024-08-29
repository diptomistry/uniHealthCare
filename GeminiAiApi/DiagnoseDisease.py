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
        "We have a medical center in our university. The medical center has the following departments: "
        "Cardiology Department, Dental Department, Ophthalmology Department, ENT (Ear, Nose, Throat) Department, "
        "Physiotherapy Department, and Homeopathy Department. Patients will describe their symptoms, and you will "
        "have to suggest the patient which department can solve their problem. Answer just the department name, nothing else. "
        "If the user inputs irrelevant data that is not related to a health issue, ask them to submit relevant text. "
        "Do not ever give any response except the two things: "
        "1. Suggest the corresponding department if a health issue is submitted. "
        "2. If the user submits something irrelevant to health issues, tell them to submit health-related issues."
    ),
)

@app.route('/diagnose', methods=['POST'])
def chat():
    data = request.json
    user_input = data.get('user_input')  # Note: change 'message' to 'user_input' to match your JSON structure
    
    if not user_input:
        return jsonify({"error": "Input message is required."}), 400

    chat_session = model.start_chat(
        history=[
            {
                "role": "user",
                "parts": [
                    "We have a medical center in our university. The medical center has the following departments: "
                    "Cardiology Department, Dental Department, Ophthalmology Department, ENT (Ear, Nose, Throat) Department, "
                    "Physiotherapy Department, and Homeopathy Department. Patients will describe their symptoms, and you will "
                    "have to suggest which department can solve their problem. Answer just the department name, nothing else. "
                    "If the user inputs irrelevant data that is not related to a health issue, ask them to submit relevant text. "
                    "Do not ever give any response except the two things: "
                    "1. Suggest the corresponding department if a health issue is submitted. "
                    "2. If the user submits something irrelevant to health issues, tell them to submit health-related issues."
                ],
            },
            {
                "role": "model",
                "parts": [
                    "Okay, I'm ready. Tell me the patient's symptoms.\n",
                ],
            },
        ]
    )

    response = chat_session.send_message(user_input)
    return jsonify({"response": response.text})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
