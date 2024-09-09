from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import google.generativeai as genai

# Initialize Flask app
app = Flask(__name__)
CORS(app)


# Set your API key
os.environ["GEMINI_API_KEY"] = "AIzaSyCSsXdxWN3sI4JLz-I0vxDh9Py1oyN314Y"

genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Model configuration
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config
)

# Start the chat session with predefined instructions
chat_session = model.start_chat(
    history=[
        {
            "role": "user",
        "parts": [
        "user will ask for health advice . you will just answer it . your are a doctor for him. if you the user say irrelevant things don't answer it . Ask to say health related questions. And answer in one paragraph don't use any bullet point type things ,just texts.\nWhen suggesting the user to get advice from doctor, say : ' please consult with a medical professional , you can get free treatment from Dhaka University Medical Center. So book your appointment now.'\n",
      ],
        },
        {
            "role": "model",
            "parts": [
                "Please tell me about your health concerns. I'm here to help. 😊",
            ],
        },
    ]
)

# Route to handle chatbot messages
@app.route('/api/ask', methods=['POST'])
def ask_medical_advice():
    try:
        # Extract user's message from the request
        user_message = request.json.get('message')
        
        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        # Send the message to the Gemini model
        response = chat_session.send_message(user_message)
        
        # Return the model's response
        return jsonify({"response": response.text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Start Flask app
if __name__ == '__main__':
    app.run(debug=True, port=5002)
