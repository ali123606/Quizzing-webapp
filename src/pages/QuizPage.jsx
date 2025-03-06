import React from "react";
import sampleQuizData from "../sampledata/samplequiz.json";
import McqsViewer from "../components/McqsViewer";
import TrueFalse from "../components/TrueFalse";

const QuizPage = () => {
  return (
    <div className="p-4 mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">
        {sampleQuizData.quizTitle}
      </h1>
      {/* show mxqs */}
      {sampleQuizData.mcqs && (
        <h1 className="text-2xl font-bold text-left my-6">MCQS</h1>
      )}
      <div className="space-y-6">
        {sampleQuizData.mcqs.map((question) => (
          <McqsViewer key={question.id} question={question} />
        ))}
      </div>

      {/* show true false */}
      {sampleQuizData.truefalse && (
        <h1 className="text-2xl font-bold text-left mt-20 mb-6">True/False</h1>
      )}
      <div className="space-y-2">
        {sampleQuizData.truefalse?.map((question) => (
          <TrueFalse key={question.id} question={question} />
        )) || " "}
      </div>

      <button className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg">
        Evaluate it
      </button>
    </div>
  );
};

export default QuizPage;
