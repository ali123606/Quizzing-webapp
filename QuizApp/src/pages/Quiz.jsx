import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuizCreator = () => {
  const [question, setQuestion] = useState("");
  const navigate = useNavigate();

  const handleGenerate = () => {
    if (question.trim() === "") {
      alert("Please enter a question");
      return;
    }
    navigate("/quiz", { state: { question } });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gray-800 text-white text-center py-4 text-lg font-semibold">
        Create Quiz
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-lg p-6 rounded-lg max-w-lg w-full">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Create Your Quiz Question
          </h2>
          
          {/* Question Input Box */}
          <textarea
            className="w-full border border-gray-300 p-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={4}
          ></textarea>

          {/* Generate Button (Small Size) */}
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-600 text-white px-3 py-1 text-sm rounded-lg hover:bg-blue-700 transition"
              onClick={handleGenerate}
            >
              Generate
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
        &copy; 2025 Quiz App | All Rights Reserved
      </footer>
    </div>
  );
};

export default QuizCreator;
