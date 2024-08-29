import torch # type: ignore
import torch.nn as nn # type: ignore


class NeuralNet(nn.Module):
    def __init__(self, input_size, hidden_size, num_classes):
        super(NeuralNet, self).__init__()
        self.l1 = nn.Linear(input_size, hidden_size) #hidden layer 1
        self.l2 = nn.Linear(hidden_size, hidden_size) #hidden layer 2
        self.l3 = nn.Linear(hidden_size, num_classes)#output layer
        self.relu = nn.ReLU()#activation function
    
    def forward(self, x):
        out = self.l1(x)#linear transformation of input x to hidden layer l1
        out = self.relu(out)#activation function
        out = self.l2(out)#linear transformation of hidden layer l1 to hidden layer l2
        out = self.relu(out)#activation function
        out = self.l3(out)#linear transformation of hidden layer l2 to output layer l3
        # no activation and no softmax at the end
        return out
"""
The model is a simple feedforward neural network with 3 linear layers and 2 ReLU activation functions.
hidden layer1:The output of l1 goes through a ReLU activation function and then to l2, the second linear layer. 
              This forms the first hidden layer.
hidden layer2:The output of l2 goes through another ReLU activation function and then to l3, the third linear layer.
              This forms the second hidden layer.
so the model is considered as deep learning model.
output layer:L3

The forward function defines the forward pass of the model.
The input is passed through the first linear layer, followed by a ReLU activation function.
The output of the first layer is passed through the second linear layer and another ReLU activation function.
Finally, the output of the second layer is passed through the third linear layer.
"""
