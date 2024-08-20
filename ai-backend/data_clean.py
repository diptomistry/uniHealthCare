import pandas as pd
from sklearn.model_selection import train_test_split

# Example: Load and preprocess dataset
data = pd.read_csv('conversations.csv')
# print(data.head())
data['input'] = data['input'].str.lower()
data['output'] = data['output'].str.lower()

# Split data into training and validation sets
train_data, val_data = train_test_split(data, test_size=0.1, random_state=42)
print(train_data)
print(val_data)
