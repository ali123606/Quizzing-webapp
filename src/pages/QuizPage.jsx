import React from "react";
import { useLocation } from "react-router-dom";
import sampleQuizData from "../sampledata/samplequiz.json";
import McqsViewer from "../components/McqsViewer";
import TrueFalse from "../components/TrueFalse";

const QuizPage = () => {
  const location = useLocation();
  const questionType = location.state?.questionType;

  /* show true false */
  const showTrueFalse = () => {
    return (
      <>
        {sampleQuizData.truefalse && (
          <h1 className="text-2xl font-bold text-left mt-20 mb-6">
            True/False
          </h1>
        )}
        <div className="space-y-2">
          {sampleQuizData.truefalse?.map((question) => (
            <TrueFalse key={question.id} question={question} />
          )) || " "}
        </div>
      </>
    );
  };

  /* show mxqs */
  const showMcqs = () => {
    return (
      <>
        {sampleQuizData.mcqs && (
          <h1 className="text-2xl font-bold text-left my-6">MCQS</h1>
        )}
        <div className="space-y-6">
          {sampleQuizData.mcqs.map((question) => (
            <McqsViewer key={question.id} question={question} />
          ))}
        </div>
      </>
    );
  };

  // show short questions
  const showFillintheBlanks = () => {
    return (
      <>
        <h1 className="text-2xl font-bold text-left my-6">
          Fill in the blanks
        </h1>
        <div>
          {sampleQuizData.fillintheblanks.map((question) => (
            <div key={question.id} className="mb-4">
              <p>
                {question.id}. {question.question}
              </p>
              <input
                type="text"
                placeholder="Enter your answer"
                className="border-2 border-gray-300 rounded-lg p-2 w-full mt-2"
              />
            </div>
          ))}
        </div>
      </>
    );
  };

  // show Short questions
  const showShortQuestions = () => {
    return (
      <>
        <h1 className="text-2xl font-bold text-left my-6">Short Questions</h1>
        <div>
          {sampleQuizData.shortquestions.map((question) => (
            <div key={question.id} className="mb-4">
              <p>
                {question.id}. {question.question}
              </p>
              <input
                type="text"
                placeholder="Enter your answer"
                className="border-2 border-gray-300 rounded-lg p-2 w-full mt-2"
              />
            </div>
          ))}
        </div>
      </>
    );
  };

  // show scenario base questions
  const showScenarioBasedQuestions = () => {
    return (
      <>
        <h1 className="text-2xl font-bold text-left my-6">
          scenario base questions
        </h1>

        <div>
          {sampleQuizData.scenariobasedquestions.map((question) => (
            <div key={question.id} className="mb-8">
              <p>
                {question.id}. {question.scenario}
              </p>
              <input
                type="text"
                placeholder="Enter your answer"
                className="border-2 border-gray-300 rounded-lg p-2 w-full mt-2"
              />
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="p-4 mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">
        {sampleQuizData.quizTitle}
      </h1>

      {questionType === "Scenario-based question" &&
        showScenarioBasedQuestions()}
      {questionType === "Short Question" && showShortQuestions()}
      {questionType === "Fill in the blanks" && showFillintheBlanks()}
      {questionType === "mcqs" && showMcqs()}
      {questionType === "T/F" && showTrueFalse()}

      <button className="mt-6 px-6 py-2 bg-gray-800 text-white font-semibold rounded-lg">
        Evaluate it
      </button>
    </div>
  );
};

export default QuizPage;
// this is commit from marfoa branch
