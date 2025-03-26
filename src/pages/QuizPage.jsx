import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import fetchGeminiResponse from "../fetchGeminiResponse"; // API import
import McqsViewer from "../components/McqsViewer";
import TrueFalse from "../components/TrueFalse";

const QuizPage = () => {
  const location = useLocation();
  const questionType = location.state?.questionType;
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);

  // API call to fetch quiz questions
  useEffect(() => {
    const getQuizData = async () => {
      const prompt = "Generate a quiz with MCQs, True/False, Short Questions, and Fill in the Blanks in JSON format.";
      const result = await fetchGeminiResponse(prompt);
      
      if (result && result.candidates) {
        try {
          // JSON Parse karein API response
          const parsedData = JSON.parse(result.candidates[0]?.content.parts[0]?.text);
          setQuizData(parsedData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
      setLoading(false);
    };

    getQuizData();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading quiz...</p>;
  }

  if (!quizData) {
    return <p className="text-center text-red-500">Failed to load quiz data.</p>;
  }

  // Render True/False questions
  const showTrueFalse = () => (
    <>
      {quizData.truefalse && <h1 className="text-2xl font-bold text-left mt-20 mb-6">True/False</h1>}
      <div className="space-y-2">
        {quizData.truefalse?.map((question) => (
          <TrueFalse key={question.id} question={question} />
        )) || " "}
      </div>
    </>
  );

  // Render MCQs
  const showMcqs = () => (
    <>
      {quizData.mcqs && <h1 className="text-2xl font-bold text-left my-6">MCQS</h1>}
      <div className="space-y-6">
        {quizData.mcqs.map((question) => (
          <McqsViewer key={question.id} question={question} />
        ))}
      </div>
    </>
  );

  // Render Fill in the Blanks
  const showFillintheBlanks = () => (
    <>
      <h1 className="text-2xl font-bold text-left my-6">Fill in the blanks</h1>
      <div>
        {quizData.fillintheblanks.map((question) => (
          <div key={question.id} className="mb-4">
            <p>{question.id}. {question.question}</p>
            <input type="text" placeholder="Enter your answer" className="border-2 border-gray-300 rounded-lg p-2 w-full mt-2" />
          </div>
        ))}
      </div>
    </>
  );

  // Render Short Questions
  const showShortQuestions = () => (
    <>
      <h1 className="text-2xl font-bold text-left my-6">Short Questions</h1>
      <div>
        {quizData.shortquestions.map((question) => (
          <div key={question.id} className="mb-4">
            <p>{question.id}. {question.question}</p>
            <input type="text" placeholder="Enter your answer" className="border-2 border-gray-300 rounded-lg p-2 w-full mt-2" />
          </div>
        ))}
      </div>
    </>
  );

  // Render Scenario-Based Questions
  const showScenarioBasedQuestions = () => (
    <>
      <h1 className="text-2xl font-bold text-left my-6">Scenario-Based Questions</h1>
      <div>
        {quizData.scenariobasedquestions.map((question) => (
          <div key={question.id} className="mb-8">
            <p>{question.id}. {question.scenario}</p>
            <input type="text" placeholder="Enter your answer" className="border-2 border-gray-300 rounded-lg p-2 w-full mt-2" />
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="p-4 mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">{quizData.quizTitle}</h1>

      {questionType === "Scenario-based question" && showScenarioBasedQuestions()}
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
