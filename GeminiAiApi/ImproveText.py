from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for the entire app

# Set your API key
os.environ["GEMINI_API_KEY"] = "AIzaSyA6PanoKCq945enwgph8CU8tt0fqIm3X8Q"

genai.configure(api_key=os.environ["GEMINI_API_KEY"])


# Create the model
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)

@app.route('/improve-text', methods=['POST'])
def improve_text():
    data = request.json
    input_text = data.get('text', '')

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

if __name__ == '__main__':
    app.run(debug=True)
