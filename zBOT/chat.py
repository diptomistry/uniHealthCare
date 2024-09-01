from flask import Flask, request, jsonify
import random
import json

import torch # type: ignore
from flask_cors import CORS 
from model import NeuralNet
from nltk_utils import bag_of_words, tokenize
from spellchecker import SpellChecker

app = Flask(__name__)
CORS(app) 
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')#if gpu is available then cuda else cpu,cuda is faster than cpu

with open('intents.json', 'r') as json_data:
    intents = json.load(json_data)

FILE = "data.pth"
data = torch.load(FILE, weights_only=True)#loading the model weights


input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data['all_words']
tags = data['tags']
model_state = data["model_state"]

model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

#bot_name = "zBOT"
fallback_responses = [
    "I do not understand...",
    "Can you please rephrase that?",
    "I'm not sure I understand. Could you clarify?"
]
spell = SpellChecker()

def correct_spelling(sentence):
    """Correct the spelling of each word in the sentence."""
    words = sentence.split()
    corrected_sentence = ' '.join([spell.correction(word) for word in words])
    return corrected_sentence
def get_response(msg):
    msg = correct_spelling(msg)
    sentence = tokenize(msg)
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])#reshaping means converting 1D array to 2D array with 1 row (1 sample ex:"How can I book an appointment?") and X.shape[0](features) columns
    X = torch.from_numpy(X).to(device)#converting numpy array to tensor to pass it to the model

    output = model(X)
    _, predicted = torch.max(output, dim=1)#getting the index of the maximum value in the output tensor .dimenstion is 1 because we are working with 1D array

    tag = tags[predicted.item()]#getting the tag of the predicted value

    probs = torch.softmax(output, dim=1)#softmax function to get probability
    prob = probs[0][predicted.item()]#getting the probability of the predicted value
    if prob.item() > 0.75:#if probability is greater than 0.75 then only it will give response
        for intent in intents['intents']:
            if tag == intent["tag"]:
                return random.choice(intent['responses'])
    
    return random.choice(fallback_responses)

@app.route('/chat', methods=['POST'])
def chat():
    try:
        message = request.json['message']
        response = get_response(message)
        return jsonify({"response": response})
    except:
        return jsonify({"response": "Something went wrong! Please try again."})

if __name__ == "__main__":
    app.run(debug=True)
    print("Let's chat! (type 'quit' to exit)")
    while True:
        # sentence = "do you use credit cards?"
        sentence = input("You: ")
        if sentence == "quit":
            break

        resp = get_response(sentence)
        print(resp)
   

