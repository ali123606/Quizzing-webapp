import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import fetchGeminiResponse from "../pages/fetchGeminiResponse";
import { MdDoNotDisturb } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";

const QuizPage = () => {
  const location = useLocation();
  const question = location.state?.question;
  const [qNo, setQNo] = useState(0);
  const [repeatedQNo, setRepeatedQNo] = useState(0);
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [temp, setTemp] = useState(0);

  const [isAnswered, setIsAnswered] = useState(false);
  const [incorrectAnswerDots, setIncorrectAnswerDots] = useState(0);
  const [remainingDots, setRemainingDots] = useState(0);
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);

  const handleAnswerSelection = (isCorrect, questionData, isRepeated) => {
    if (isRepeated == false) {
      if (!isCorrect) {
        setIncorrectQuestions((prev) => [...prev, questionData]); // Store wrong MCQs
        setIncorrectAnswerDots((prev) => prev + 1);
      }
      setRemainingDots((prev) => Math.max(prev - 1, 0));
      setQNo((prev) => prev + 1);
    } else {
      if (!isCorrect) {
        setIncorrectQuestions((prev) => [...prev, questionData]); // Store wrong MCQs
        setRepeatedQNo((prev) => prev + 1);
      } else {
        setRepeatedQNo((prev) => prev + 1);
        setIncorrectAnswerDots((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  // API call to fetch quiz questions
  useEffect(() => {
    const getQuizData = async () => {
      const prompt = `
                    Generate a quiz in JSON format with the following structure:
                    [
                      Title: "Quiz short title",
                      {
                        "section": "MCQs",
                        "questions": [
                          {
                            "questionText": "Question 1",
                            "options": ["Option A", "Option B", "Option C", "Option D"],
                            "answer": "Correct Answer"
                          }
                        ]
                      }
                    ]
                      
                    
                    The quiz should include the following sections:
                    1. Multiple Choice Questions (MCQs)
                    Topic: ${question}
                    No of mcq: 5
                    difficulty: medium
                    Please ensure the response strictly follows the provided JSON structure.
                    `;

      const result = await fetchGeminiResponse(prompt);

      if (
        result &&
        Array.isArray(result.candidates) &&
        result.candidates.length > 0
      ) {
        try {
          // Safely access the first candidate's content
          let content = result?.candidates[0]?.content?.parts?.[0]?.text;

          if (content) {
            // Remove Markdown formatting (triple backticks and "json" label)
            content = content.replace(/```json|```/g, "").trim();

            // Parse the cleaned JSON content
            const parsedData = JSON.parse(content);
            setQuizData(parsedData);
            setRemainingDots(parsedData[1]?.questions?.length);
            console.log("Parsed Quiz Data:", parsedData);
          } else {
            console.error("Content is missing or invalid in the API response.");
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      } else {
        console.error("No valid candidates found in the API response.");
      }
      setLoading(false);
    };

    getQuizData();
  }, [temp]);

  if (loading) {
    return <p className='text-center mt-10'>Loading quiz...</p>;
  }

  if (!quizData) {
    return (
      <p className='text-center text-red-500'>Failed to load quiz data.</p>
    );
  }

  return (
    <div className='p-4 min-h-screen '>
      <h1 className='text-2xl font-bold text-center mb-6'>
        {quizData[0].Title}
      </h1>

      {/* mcqs section */}
      <section className='min-h-64 relative py-4'>
        <div className='relative top-0 left-0 flex gap-2'>
          {/* show dots for remaining mcqs */}
          <div className={`absolute top-0 left-0 flex `}>
            <div
              className={`flex gap-2 opacity-55 duration-300 transition-all bg-black rounded-full p-2 ${
                remainingDots === 0 ? "hidden" : ""
              }`}
            >
              {[...Array(remainingDots)].map((_, index) => (
                <span
                  key={index}
                  className='bg-green-200 rounded-full w-3 h-3'
                ></span>
              ))}
            </div>
            {/* incorrect questions dots */}
            <div className={`flex gap-2 p-2`}>
              {[...Array(incorrectAnswerDots)].map((_, index) => (
                <span
                  key={index}
                  className='bg-red-200 rounded-full w-3 h-3'
                ></span>
              ))}
            </div>
          </div>
        </div>
        {quizData[1]?.questions[qNo]?.questionText !== undefined ? (
          <Mcqs
            question={quizData[1]?.questions[qNo]?.questionText}
            option0={quizData[1]?.questions[qNo]?.options[0]}
            option1={quizData[1]?.questions[qNo]?.options[1]}
            option2={quizData[1]?.questions[qNo]?.options[2]}
            option3={quizData[1]?.questions[qNo]?.options[3]}
            correctAnswer={quizData[1]?.questions[qNo]?.answer}
            nextQuestion={handleAnswerSelection}
            qNo={qNo}
            isRepeated={false}
          />
        ) : incorrectQuestions &&
          incorrectQuestions.length > 0 &&
          incorrectAnswerDots !== 0 ? (
          <Mcqs
            question={incorrectQuestions[repeatedQNo]?.questionText}
            option0={incorrectQuestions[repeatedQNo]?.options[0]}
            option1={incorrectQuestions[repeatedQNo]?.options[1]}
            option2={incorrectQuestions[repeatedQNo]?.options[2]}
            option3={incorrectQuestions[repeatedQNo]?.options[3]}
            correctAnswer={incorrectQuestions[repeatedQNo]?.answer}
            nextQuestion={handleAnswerSelection}
            qNo={qNo}
            isRepeated={true}
          />
        ) : (
          <div>congragulations</div>
        )}
      </section>
    </div>
  );
};

const Mcqs = ({
  question,
  option0,
  option1,
  option2,
  option3,
  correctAnswer,
  nextQuestion,
  qNo,
  isRepeated,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const checkMcqs = (optionClicked) => {
    setSelectedOption(optionClicked);
    setIsCorrect(optionClicked === correctAnswer);
  };

  return (
    <div className=''>
      <div className='mt-36 md:mt-10'>
        <h1 className='text-xl font-semibold leading-8'>{question}</h1>
        <div className='flex flex-col gap-4 mt-4'>
          {[option0, option1, option2, option3].map((option, index) => (
            <button
              key={index}
              className={`relative btn flex items-center px-4 py-2 border rounded-md 
                  ${selectedOption ? "pointer-events-none" : ""}`}
              onClick={() => checkMcqs(option)}
            >
              {selectedOption && option === correctAnswer ? (
                <FaCheckCircle className='absolute left-4 text-green-500 w-6 h-6' />
              ) : selectedOption === option ? (
                <FaTimesCircle className='absolute left-4 text-red-500 w-6 h-6' />
              ) : null}
              <span className='ml-8'>{option}</span>
            </button>
          ))}
        </div>

        <div className='mt-4 flex justify-between opacity-65'>
          <button className='btn bg-white text-black hover:bg-slate-300 rounded-full cursor-default opacity-0'>
            <MdDoNotDisturb /> Ignore
          </button>
          <button
            className='btn bg-white text-black hover:bg-slate-300 rounded-full flex justify-center items-center'
            onClick={() => {
              nextQuestion(
                isCorrect,
                {
                  questionText: question,
                  options: [option0, option1, option2, option3],
                  answer: correctAnswer,
                },
                isRepeated
              );
              setSelectedOption(null);
            }}
          >
            <span>Next</span> <FaLocationArrow className='rotate-45' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
