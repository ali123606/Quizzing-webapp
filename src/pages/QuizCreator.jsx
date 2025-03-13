import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuizCreator = () => {
  const [questionType, setQuestionType] = useState("mcqs");
  const [question, setQuestion] = useState(" ");
  const navigate = useNavigate();

  const goToQuizPage = () => {
    navigate("/quizpage", { state: { questionType } });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gray-800 text-white text-center py-4 text-lg font-semibold">
        Quiz Creator
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-lg p-6 rounded-lg max-w-lg w-full">
          {/* Question Type Selection */}
          <h2 className="text-lg font-semibold mb-4">Select Question Type</h2>
          <div className="space-y-3">
            {[
              "mcqs",
              "T/F",
              "Short Question",
              "Fill in the blanks",
              "Scenario-based question",
            ].map((type) => (
              <label
                key={type}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="questionType"
                  value={type}
                  checked={questionType === type}
                  onChange={() => setQuestionType(type)}
                  className="hidden"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 ${
                    questionType === type
                      ? "bg-gray-800 border-gray-800"
                      : "border-gray-400"
                  }`}
                ></div>
                <span className="text-gray-700">{type}</span>
              </label>
            ))}
          </div>

          {/* Question Input */}
          <div className="mt-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Enter Question
            </label>
            <textarea
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
              rows="3"
              placeholder="Type your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            ></textarea>
          </div>

          {/* Generate Button */}
          <button
            className="mt-4 w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition"
            onClick={goToQuizPage}
          >
            Generate
          </button>
        </div>
      </main>
    </div>
  );
};

export default QuizCreator;
