import React, { useState } from "react";
import Button from "../../layouts/dashboard/DutyRoster/Button";
const ImageGenerator = ({ setImageSrc }) => {
  const [prompt, setPrompt] = useState("");
  const [showInput, setShowInput] = useState(false);

  const fetchImage = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      });
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImageSrc(imageUrl); // Send image URL to parent
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const handleButtonClick = () => {
    setShowInput(true); // Show the input form when the button is clicked
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchImage();
  };

  return (
    <div className="">
      {!showInput && (
        <button
          onClick={handleButtonClick}
          class="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-16 md:w-[330px] w-[300px] border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
        >
          Generate Image with AI
        </button>
      )}
      {showInput && (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your image prompt"
            className="border rounded py-2 px-3"
            rows={2} 
          />
          <button type="submit">
            <Button title="Generate" />
          </button>
        </form>
      )}
    </div>
  );
};

export default ImageGenerator;
