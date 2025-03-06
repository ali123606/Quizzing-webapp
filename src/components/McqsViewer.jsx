import React from "react";

const McqsViewer = ({ question }) => {
  return (
    <>
      <div key={question.id} className="p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold mb-3">
          {question.id}. {question.question}
        </h2>
        <ul className="space-y-2">
          {question.options.map((option, index) => (
            <li key={index} className="flex items-center">
              <input
                type="radio"
                name={`question-${question.id}`}
                id={`option-${question.id}-${index}`}
                className="mr-2"
              />
              <label
                htmlFor={`option-${question.id}-${index}`}
                className="text-gray-700"
              >
                {option}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default McqsViewer;
