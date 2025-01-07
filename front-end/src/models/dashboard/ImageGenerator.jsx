// import React, { useState } from "react";
// import Button from "../../layouts/dashboard/DutyRoster/Button";

// const ImageGenerator = ({ setImageSrc }) => {
//   const [prompt, setPrompt] = useState("");
//   const [showInput, setShowInput] = useState(false);
//   const [loading, setLoading] = useState(false); // Track loading state

//   const fetchImage = async () => {
//     setLoading(true); // Start loading
//     try {
//       const response = await fetch("http://127.0.0.1:5000/generate-image", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ inputs: prompt }),
//       });
//       const blob = await response.blob();
//       const imageUrl = URL.createObjectURL(blob);
//       setImageSrc(imageUrl); // Send image URL to parent
//     } catch (error) {
//       console.error("Error fetching image:", error);
//     }
//     setLoading(false); // Stop loading
//   };

//   const handleButtonClick = () => {
//     setShowInput(true); // Show the input form when the button is clicked
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetchImage();
//   };

//   return (
//     <div className="">
//       {!showInput && (
//         <button
//           onClick={handleButtonClick}
//           className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-16 md:w-[330px] w-[300px] border text-left p-3 text-gray-50 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
//         >
//           Generate Image with AI
//         </button>
//       )}
//       {showInput && !loading && (
//         <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
//           <textarea
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             placeholder="Enter your image prompt"
//             className="border rounded py-2 px-3"
//             rows={2}
//           />
//           <button type="submit" className="flex justify-end">
//             <Button title="Generate" />
//           </button>
//         </form>
//       )}
//       {loading && (
//         <div className="flex-col gap-4 w-full flex items-center justify-center">
//           <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
//             <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageGenerator;


import React, { useState } from "react";
import Button from "../../layouts/dashboard/DutyRoster/Button";
import withLoading from "../../layouts/WithLoading";

const ImageGenerator = ({ setImageSrc,setIsLoading }) => {
  const [prompt, setPrompt] = useState("");
  const [showInput, setShowInput] = useState(false);

  const fetchImage = async () => {
    console.log("fetching image");
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5001/generate-image", {
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
    setIsLoading(false);
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
          className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-16 md:w-[330px] w-[300px] border text-left p-3 text-gray-50 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
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
          <button type="submit" className="flex justify-end">
            <Button title="Generate" />
          </button>
        </form>
      )}
    </div>
  );
};

// Custom loader
const CustomLoader = () => (
  <div className="flex-col gap-4 w-full flex items-center justify-center">
    <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
      <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
    </div>
  </div>
);

// Wrap the ImageGenerator with withLoading HOC
export default withLoading(ImageGenerator, { loader: CustomLoader });

