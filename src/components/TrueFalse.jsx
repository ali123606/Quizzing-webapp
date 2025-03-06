import React from "react";

const TrueFalse = ({ question }) => {
  return (
    <>
      <div key={question.id} className="p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold mb-3">
          {question.id}. {question.question}
        </h2>
        <ul className="space-y-2">
          <li className="flex items-center">
            <input
              type="radio"
              name={`question-${question.id}`}
              id={`true-${question.id}`}
              value="True"
              className="mr-2"
            />
            <label htmlFor={`true-${question.id}`} className="text-gray-700">
              True
            </label>
          </li>
          <li className="flex items-center">
            <input
              type="radio"
              name={`question-${question.id}`}
              id={`false-${question.id}`}
              value="False"
              className="mr-2"
            />
            <label htmlFor={`false-${question.id}`} className="text-gray-700">
              False
            </label>
          </li>
        </ul>
      </div>
    </>
  );
};

export default TrueFalse;
