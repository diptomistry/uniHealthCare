import numpy as np # type: ignore
import nltk # type: ignore
nltk.download('punkt')
nltk.download('wordnet')  # Download WordNet data for lemmatization

from nltk.stem import WordNetLemmatizer # type: ignore
from nltk.tokenize import word_tokenize # type: ignore

lemmatizer = WordNetLemmatizer()

def tokenize(sentence):
    """
    Split sentence into an array of words/tokens
    A token can be a word or punctuation character, or number
    """
    return word_tokenize(sentence)

def lemmatize(word):
    """
    Lemmatization = find the root form of the word
    Examples:
    words = ["organize", "organizes", "organizing"]
    words = [lemmatize(w) for w in words]
    -> ["organ", "organ", "organ"]
    """
    return lemmatizer.lemmatize(word.lower())

def bag_of_words(tokenized_sentence, words):
    """
    Return bag of words array:
    1 for each known word that exists in the sentence, 0 otherwise
    Example:
    sentence = ["hello", "how", "are", "you"]
    words = ["hi", "hello", "I", "you", "bye", "thank", "cool"]
    bog   = [  0 ,    1 ,    0 ,   1 ,    0 ,    0 ,      0]
    """
    # Lemmatize each word
    sentence_words = [lemmatize(word) for word in tokenized_sentence]
    # Initialize bag with 0 for each word
    bag = np.zeros(len(words), dtype=np.float32)
    for idx, w in enumerate(words):
        if w in sentence_words: 
            bag[idx] = 1

    return bag
