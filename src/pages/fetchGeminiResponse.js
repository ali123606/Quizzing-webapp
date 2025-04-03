import axios from "axios";

const API_KEY = "AIzaSyCBEYo-v2zO-xuy2fQfoPiSa9cYaYvOd78";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const fetchGeminiResponse = async (inputText) => {
    try {
        const response = await axios.post(
            API_URL,
            { contents: [{ parts: [{ text: inputText }] }] },
            { headers: { "Content-Type": "application/json" } }
        );
        console.log("Full API Response:", response?.data); // Log the full response
        console.log("Candidates Array:", response?.data?.candidates); // Log the candidates array
        return response?.data; // Return the API response
    } catch (error) {
        console.error("Error fetching Gemini response:", error);
        return null;
    }
};

export default fetchGeminiResponse;
