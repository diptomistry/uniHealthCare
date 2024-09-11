import React, { useState, useEffect } from "react";
import CustomModal from "./CustomModal";
import doctorGif from "../assets/gif/doctor.gif";
import { BiUserVoice } from "react-icons/bi";
import { FaBraille } from "react-icons/fa";



const MediBotButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setQuestion] = useState(""); // Track the user's input
  const [response, setResponse] = useState(""); // Track the AI's response
  const [voices, setVoices] = useState([]); // Store available voices
  const [isSpeaking, setIsSpeaking] = useState(false);
  useEffect(() => {
    const loadVoices = () => {
      return new Promise((resolve) => {
        let availableVoices = window.speechSynthesis.getVoices();

        if (availableVoices.length !== 0) {
          setVoices(availableVoices);
          resolve(availableVoices);
        } else {
          window.speechSynthesis.onvoiceschanged = () => {
            availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
            resolve(availableVoices);
          };
        }
      });
    };

    loadVoices();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    // Stop any ongoing speech synthesis when the modal is closed
    window.speechSynthesis.cancel();
    setIsModalOpen(false);
  };

  const speakResponse = (text) => {
    if ("speechSynthesis" in window) {
      // Clear any previously queued speech
      window.speechSynthesis.cancel();

      // Function to split text into smaller chunks
      const splitText = (str, maxLength = 200) => {
        const regex = new RegExp(`.{1,${maxLength}}(\\s|$)`, "g");
        return str.match(regex) || [];
      };

      const chunks = splitText(text);

      // Function to speak each chunk sequentially
      const speakChunk = (chunk) => {
        const speech = new SpeechSynthesisUtterance(chunk);
        speech.lang = "en-US"; // Set language for the voice

        // Select a male voice if available (this part is similar to before)
        const maleVoice = voices.find(
          (voice) => voice.name.includes("Male") || voice.name.includes("David")
        );
        if (maleVoice) {
          speech.voice = maleVoice;
        }
        // Show GIF when speech starts
        //setIsSpeaking(true);
        speech.onstart = () => {
          console.log("Speech started");
          setIsSpeaking(true);
        };

        const checkSpeechEnd = setInterval(() => {
          if (!window.speechSynthesis.speaking) {
            console.log("Speech ended (detected by interval)");
            setIsSpeaking(false);
            clearInterval(checkSpeechEnd);
          }
        }, 100);

        window.speechSynthesis.speak(speech);

        return new Promise((resolve) => {
          speech.onend = resolve; // Resolve when speech ends
        });
      };

      // Speak each chunk in sequence
      (async () => {
        for (const chunk of chunks) {
          await speakChunk(chunk);
        }
      })();
    } else {
      console.error("Speech synthesis not supported in this browser.");
    }
  };

  // Function to handle the form submission
  const handleSubmit = async (e, shouldSpeak = false) => {
    e.preventDefault(); // Prevent form from refreshing

    try {
      const aiResponse = await fetch("http://127.0.0.1:5000/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }), // Send the question with the correct key "message"
      });

      const data = await aiResponse.json();
      console.log("Full response:", data);

      if (data.response) {
        setResponse(data.response);
        if (shouldSpeak) {
          speakResponse(data.response); // Trigger voice response if shouldSpeak is true
        }
      } else {
        setResponse("Sorry, no response received from the AI.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponse("Sorry, I couldn't process your request. Please try again.");
    }
  };

  return (
    <div>
      <button
        className="flex overflow-hidden items-center text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-gray-600 text-white shadow hover:bg-gray-700 h-9 px-4 py-2 max-w-52 whitespace-pre md:flex group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out ring-2 ring-gray-800 hover:ring-black hover:ring-offset-2"
        onClick={openModal} // Opens the modal on click
      >
        <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>
        <span className="ml-1 text-white">Ask for Medical Advice</span>
       <div>
       <FaBraille size={24} />
       </div>
      </button>

      {/* Modal component */}
      <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
        {/* Modal content */}
        <h2 className="text-lg font-bold flex justify-center">
          Medical Advice Bot
        </h2>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Ask me anything</h1>

          {/* Form to ask the question */}
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Type your question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-10">
              <button
                onClick={(e) => handleSubmit(e, false)}
                type="submit"
                className="bg-primaryColor basis-full text-white px-4 py-2 rounded-md hover:bg-hoverColor transition"
              >
                Ask without voice response
              </button>
              <button
                onClick={(e) => handleSubmit(e, true)}
                type="submit"
                className="bg-primaryColor basis-full text-white px-4 py-2 rounded-md hover:bg-hoverColor transition flex items-center justify-center gap-2"
              >
                Ask with voice response
                <BiUserVoice size={24} />
              </button>
            </div>
          </form>

          {/* Display the AI response */}
          {response && (
            <div className="flex flex-col md:flex-row justify-around">
              <div className="mt-4 p-4 border border-gray-300 rounded-md md:w-1/2 h-64 overflow-auto">
                <h3 className="font-semibold">Response:</h3>
                <p>{response}</p>
              </div>
              {isSpeaking && (
                <div className="relative w-64 h-64 mb-4 mt-4">
                  <img
                    src={doctorGif}
                    alt="loading gif"
                    className="w-full h-full object-cover scale-x-[-1] rounded-xl"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </CustomModal>
    </div>
  );
};

export default MediBotButton;
