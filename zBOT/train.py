import numpy as np # type: ignore
import random
import json

import torch # type: ignore
import torch.nn as nn # type: ignore
from torch.utils.data import Dataset, DataLoader # type: ignore

from nltk_utils import bag_of_words, tokenize, stem
from model import NeuralNet

with open('intents.json', 'r') as f:
    intents = json.load(f)

all_words = []
tags = []
xy = []
# loop through each sentence in our intents patterns
for intent in intents['intents']:
    tag = intent['tag']
    # add to tag list
    tags.append(tag)
    for pattern in intent['patterns']:
        # tokenize each word in the sentence
        w = tokenize(pattern)
        # add to our words list
        all_words.extend(w)
        # add to xy pair
        xy.append((w, tag))#pattern and corresponding tag

# stem and lower each word
ignore_words = ['?', '.', '!', ',', ';', ':']
all_words = [stem(w) for w in all_words if w not in ignore_words]#stemming
# remove duplicates and sort
all_words = sorted(set(all_words))#unique words by 'set' and then sorted
tags = sorted(set(tags))

print(len(xy), "patterns")
print(len(tags), "tags:", tags)
print(len(all_words), "unique stemmed words:", all_words)

# create training data
X_train = []
y_train = []
for (pattern_sentence, tag) in xy:#pattern and corresponding tag in xy is available
    # X: bag of words for each pattern_sentence
    bag = bag_of_words(pattern_sentence, all_words)
    X_train.append(bag)
    # y: PyTorch CrossEntropyLoss needs only class labels, not one-hot
    label = tags.index(tag)#example level 0:greeting, 1:goodbye, 2:thanks, 3:noanswer
    y_train.append(label)

#example: X_train = [[0, 1 , 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 1, 0], [0, 0, 0, 0, 0, 0, 1]]
#example: y_train = [0, 1, 2]

#np is faster than Python lists for numerical computations.
X_train = np.array(X_train)#to convert list to numpy array for pytorch model training 
y_train = np.array(y_train)

# Hyper-parameters 
num_epochs = 1000#number of times the model will see the entire dataset to learn the patterns
batch_size = 8#number of samples to work through before updating the internal model parameters
learning_rate = 0.001#how much the model will learn for each step#small updates to the weights during each iteration of training.
input_size = len(X_train[0])#number of features in the input data. In this case, it is the length of the bag of words.[0] because all the samples have the same number of features.ex: [0, 1 , 0, 1, 0, 0, 0] has 7 features.
hidden_size = 8#number of neurons in the hidden layer
output_size = len(tags)
print(input_size, output_size)

class ChatDataset(Dataset):

    def __init__(self):#Stores the total number of samples in my dataset.
        self.n_samples = len(X_train)
        self.x_data = X_train# stores the input data
        self.y_data = y_train# Stores the labels 

    # support indexing such that dataset[i] can be used to get i-th sample
    def __getitem__(self, index):
        return self.x_data[index], self.y_data[index]

    # we can call len(dataset) to return the size
    def __len__(self):
        return self.n_samples

dataset = ChatDataset()#creates an instance of your dataset with X_train and y_train stored inside it.

"""
dataLoader handles:
Batching: Splits the data into batches of a specified size (batch_size),
          which helps in efficient training as it allows the model to update its weights
           more frequently.
Shuffling: Randomizes the order of the data at the beginning of each epoch,
           which helps prevent the model from learning the order of the data, 
           leading to better generalization.
Parallel Data Loading: Can load data in parallel using multiple subprocesses,
           speeding up data loading (controlled by num_workers).
"""
train_loader = DataLoader(dataset=dataset,#creates an iterable over the dataset.
                          batch_size=batch_size,#meaning that during training, each batch will ideally contain 8(batch-size) samples.However, since our dataset has only 3 samples, the entire dataset will be treated as one batch in this case.
                          shuffle=True,
                          num_workers=0)#for multi-threading to speed up data loading by using multiple subprocesses.0 means that the data will be loaded in the main process.

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')#checks if a GPU is available and sets the device accordingly.

model = NeuralNet(input_size, hidden_size, output_size).to(device)

# Loss and optimizer
criterion = nn.CrossEntropyLoss()#CrossEntropyLoss is used to compute the loss between the predicted output and the actual labels.
optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)#Adam optimizer is used to update the model parameters based on the computed gradients.

# Train the model
for epoch in range(num_epochs):
    for (words, labels) in train_loader:
        words = words.to(device)
        labels = labels.to(dtype=torch.long).to(device)
        
        # Forward pass
        outputs = model(words)
        # if y would be one-hot, we must apply
        # labels = torch.max(labels, 1)[1]
        loss = criterion(outputs, labels)#predicted output and the actual labels are passed to the loss function to compute the loss.
        
        # Backward and optimize
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        
    if (epoch+1) % 100 == 0:#checks if the current epoch is a multiple of 100 
        print (f'Epoch [{epoch+1}/{num_epochs}], Loss: {loss.item():.4f}')#This prints the current epoch number and the corresponding loss value.

"""
epoch-1: -Shuffling: Since shuffle=True, the samples in X_train and y_train are randomly shuffled.
            -Batching: The samples are divided into batches of size 8.
            -Forward Pass: The features (words) and labels are passed to the model.The model processes the input and generates an output(predicted output).
            -Loss Calculation: The output is compared with the actual labels using CrossEntropyLoss, which computes the loss.The loss is calculated using the predicted output and the actual labels.
            -Backward Pass:The optimizer updates the model's parameters based on the computed loss.
            -Optimizer Step: The optimizer updates the model parameters using the gradients.
Epochs 2 to 1000:

The same process is repeated for each epoch.
Every 100 epochs, the current loss value is printed.

 
"""
print(f'final loss: {loss.item():.4f}')


data = {
"model_state": model.state_dict(),#stores the model's state dictionary, which contains the model's parameters(weights and biases).biase means the value of the neuron when the input is zero.
"input_size": input_size,
"hidden_size": hidden_size,
"output_size": output_size,
"all_words": all_words,
"tags": tags
}

FILE = "data.pth"
torch.save(data, FILE)# after training, the model's data is saved to a file named data.pth.

print(f'training complete. file saved to {FILE}')
