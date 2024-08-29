import numpy as np # type: ignore
import nltk # type: ignore
nltk.download('punkt')
nltk.download('punkt_tab')
from nltk.stem.porter import PorterStemmer # type: ignore
stemmer = PorterStemmer()


def tokenize(sentence):
    """
    split sentence into array of words/tokens
    a token can be a word or punctuation character, or number
    example:
    sentence = "how are you?"
    words = tokenize(sentence)  # words = ["how", "are", "you", "?"]
    """
    return nltk.word_tokenize(sentence)


def stem(word):
    """
    stemming = find the root form of the word
    examples:
    words = ["organize", "organizes", "organizing"]
    words = [stem(w) for w in words]
    -> ["organ", "organ", "organ"]
    """
    return stemmer.stem(word.lower())


def bag_of_words(tokenized_sentence, words):
    """
    return bag of words array:
    1 for each known word that exists in the sentence, 0 otherwise
    example:
    sentence = ["hello", "how", "are", "you"]
    words = ["hi", "hello", "I", "you", "bye", "thank", "cool"]
    bog   = [  0 ,    1 ,    0 ,   1 ,    0 ,    0 ,      0]
    """
    # stem each word
    sentence_words = [stem(word) for word in tokenized_sentence] #example: ["hi", "how", "are", "you"]
    # initialize bag with 0 for each word
    bag = np.zeros(len(words), dtype=np.float32) #example: [0, 0, 0, 0, 0, 0, 0] //each element in the bag array will be a 32-bit floating point number(0 initially).
    for idx, w in enumerate(words):
        if w in sentence_words: 
            bag[idx] = 1

    return bag
