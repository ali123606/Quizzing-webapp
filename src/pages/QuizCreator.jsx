import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuizCreator = () => {
  const [questionType, setQuestionType] = useState("mcqs");
  const [question, setQuestion] = useState(" ");
  const navigate = useNavigate();
  const [selectedComplexity, setSelectedComplexity] = useState("Low");
  const [noOfQuestions, setNoOfQuestions] = useState(6);

  const handleComplexityChange = (e) => {
    setSelectedComplexity(e.target.value);
  };

  const goToQuizPage = () => {
    navigate("/quizpage", {
      state: { question, complexity: selectedComplexity, noOfQuestions },
    });
  };

  return (
    <div className='flex flex-col min-h-screen'>
      {/* Header */}
      <header className='text-white text-center py-4 text-lg font-semibold'>
        Quiz Creator
      </header>

      {/* Main Content */}
      <main className='flex-grow flex flex-col items-center justify-center  bg-gray-100 p-6'>
        <div className=' p-6 border-4 border-gray-300 rounded-xl max-w-lg w-full'>
          {/* Question Type Selection */}
          <h2 className='text-lg font-semibold mb-4'>Question Type</h2>
          <div className='space-y-3'>
            {[
              "mcqs",
              // "T/F",
              // "Short Question",
              // "Fill in the blanks",
              // "Scenario-based question",
            ].map((type) => (
              <label
                key={type}
                className='flex items-center space-x-3 cursor-pointer'
              >
                <input
                  type='radio'
                  name='questionType'
                  value={type}
                  checked={questionType === type}
                  onChange={() => setQuestionType(type)}
                  className='hidden'
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 ${
                    questionType === type
                      ? "bg-gray-800 border-gray-800"
                      : "border-gray-400"
                  }`}
                ></div>
                <span className='text-gray-700'>{type}</span>
              </label>
            ))}
          </div>

          {/* Complexity Selection */}
          <div className='mt-4'>
            <h3 className='text-md font-semibold pb-2'>complexity: </h3>
            <div className='join'>
              <input
                className='join-item btn  no-animation'
                type='radio'
                name='complexity'
                aria-label='Low'
                value='Low'
                onChange={handleComplexityChange}
                checked={selectedComplexity === "Low"}
              />
              <input
                className='join-item btn no-animation '
                type='radio'
                name='complexity'
                aria-label='Moderate'
                value='Moderate'
                onChange={handleComplexityChange}
                checked={selectedComplexity === "Moderate"}
              />
              <input
                className='join-item btn no-animation'
                type='radio'
                name='complexity'
                aria-label='High'
                value='High'
                onChange={handleComplexityChange}
                checked={selectedComplexity === "High"}
              />
            </div>
          </div>

          {/* No of questions selection */}
          <div className='mt-6'>
            <p className='font-semibold'>No of questions:</p>
            <div>
              <input
                type='range'
                min={5}
                max='25'
                className='range range-xs transition-all duration-100'
                step='1'
                value={noOfQuestions}
                onChange={(e) => setNoOfQuestions(e.target.value)}
              />
              <div className='flex w-full justify-between px-2 text-[10px]'>
                <span>5</span>
                <span>10</span>
                <span>15</span>
                <span>20</span>
                <span>25</span>
              </div>
            </div>
          </div>

          {/* Question Input */}
          <div className='mt-6'>
            <label className='block text-gray-700 font-semibold mb-2'>
              Enter Topic
            </label>
            <textarea
              className='w-full p-3 border-2 rounded-lg focus:outline-2 bg-transparent text-gray-800 leading-loose'
              rows='3'
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            ></textarea>
          </div>

          {/* Generate Button */}
          <button
            className='mt-4 w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition'
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
