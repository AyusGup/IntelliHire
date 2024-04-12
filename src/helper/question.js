import axios from 'axios';
// require('dotenv').config(); // Load environment variables from .env file

const fetchGeminiDataAndExtractQuestions = async (role) => {
  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
      {
        "contents": [
            {
                "role": "user",
                "parts": [
                {
                    "text": `Give me 5 question for an ${role} role interview. Question only.`
                }
                ]
            }
        ]
      },
      {
        params: {
          key: 'AIzaSyAh3Drh2cJG6bCHUIHZnXWgVtbLHrZiD_0' // Accessing environment variable
        }
      }
    );
  
    const textFromResponse = response.data.candidates[0].content.parts[0].text; // Assuming text is the key containing the response text
    const questions = extractQuestions(textFromResponse);
    
    return questions;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

function extractQuestions(text) {
  // Split the text by line breaks
  const lines = text.split("\n");
  
  // Initialize an empty array to store questions
  const questions = [];
  
  // Loop through each line
  for (const line of lines) {
    // Remove leading numbers and dots using regular expression
    const questionWithoutNumber = line.replace(/^\d+\.\s/, "");
    
    // Check if there's any text remaining after removing the number (avoid empty lines)
    if (questionWithoutNumber.trim()) {
      questions.push(questionWithoutNumber.trim());
    }
  }
  
  return questions;
}

export default fetchGeminiDataAndExtractQuestions;
