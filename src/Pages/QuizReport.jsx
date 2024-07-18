import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import quizData from "../data";

const QuizReport = () => {
  const location = useLocation();
  const { userAnswers } = location.state || { userAnswers: [] };
  const [loading, setLoading] = useState(true);

  const totalQuestions = userAnswers.length;
  const correctAnswers = userAnswers.filter(
    (answer) => answer.isCorrect
  ).length;
  const score = `${correctAnswers}/${totalQuestions}`;

  useEffect(() => {
    // Simulate loading delay, if needed
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the delay time as needed
  }, []);

  if (loading) {
    return (
      <div className="min-w-screen min-h-screen flex items-center justify-center bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-w-screen min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Header - Fixed at the top */}
      <header className="w-full bg-white shadow-md p-4 fixed top-0 left-0 z-10">
        <h1 className="text-3xl font-bold">Quiz Report</h1>
      </header>

      <div className="w-full max-w-7xl flex flex-wrap mt-20">
        {/* Left side - Scrollable report data */}
        <div className="w-full md:w-3/4 p-4 overflow-y-auto max-h-screen border-blue-300">
          <div className="grid grid-cols-2 gap-4">
            {userAnswers.map((answer, index) => (
              <div
                key={index}
                className={`mb-6 border ${
                  answer.isCorrect ? "border-green-300" : "border-red-300"
                } p-4 rounded`}
              >
                <h2 className="text-lg font-semibold mb-2">
                  {answer.question}
                </h2>
                <div className="mb-2">
                  <p className="text-gray-600 mb-1">
                    Your Answer:
                    <span
                      className={`ml-2 font-semibold ${
                        answer.isCorrect ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {answer.userAnswer}
                    </span>
                  </p>
                  <p className="text-gray-600 mb-1">
                    Correct Answer:
                    <span className="ml-2 font-semibold">
                      {answer.correctAnswer}
                    </span>
                  </p>
                </div>
                <p
                  className={`${
                    answer.isCorrect ? "text-green-600" : "text-red-600"
                  } font-semibold`}
                >
                  {answer.isCorrect ? "Correct" : "Incorrect"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Score in a circle */}
        <div className="w-full md:w-1/4 flex flex-col items-center justify-center p-4">
          <div className="w-48 h-48 bg-blue-500 rounded-full flex items-center justify-center text-white text-center mb-4">
            <div>
              <div className="text-4xl font-bold">{score}</div>
              <div className="text-sm">Score</div>
            </div>
          </div>
          {/* Back to Quiz link */}
          <Link
            to="/"
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center w-full"
          >
            Back to Quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizReport;
