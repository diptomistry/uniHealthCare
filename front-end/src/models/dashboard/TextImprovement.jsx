
    import { useEffect } from 'react';
    import axios from 'axios';
    
    const TextImprovement = ({ inputText, onTextImproved }) => {
      useEffect(() => {
        const improveText = async () => {
          try {
            const response = await axios.post('http://127.0.0.1:5000/improve-text', {
              text: inputText,
            });
            onTextImproved(response.data.corrected_text); // Send the corrected text back to the parent
          } catch (error) {
            console.error('Error improving text:', error);
            onTextImproved('Error processing text');
          }
        };
    
        if (inputText) {
          improveText(); // Trigger the text improvement if inputText is provided
        }
      }, [inputText, onTextImproved]);
    
      return null; // No need to render anything
    };
    
    export default TextImprovement;
    