
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import quizData from "../data";
 import {toast } from "react-toastify";
import LoadingBar from "react-top-loading-bar";

const Quiz = () => {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const shuffledQuestions = [...quizData].sort(() => Math.random() - 0.5);
    setQuestions(shuffledQuestions);
    // console.log("shuffle:", shuffledQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setShowAnswer(false);
    setUserAnswers([]);
  };

  const handleAnswerOptionClick = (selectedOption) => {
    const isCorrect = selectedOption === questions[currentQuestion].answer;
    const answerObject = {
      question: questions[currentQuestion].question,
      userAnswer: selectedOption,
      correctAnswer: questions[currentQuestion].answer,
      isCorrect: isCorrect,
    };

    setUserAnswers((prevUserAnswers) => [...prevUserAnswers, answerObject]);
    // console.log("Current User Answers:", [...userAnswers, answerObject]);

    setShowAnswer(true);
    setProgress(100);

    setTimeout(() => {
      setShowAnswer(false);
      setProgress(0);

      const nextQuestion = currentQuestion + 1;

      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setTimeout(() => {
          toast("🦄 Wow so easy!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          navigate("/quiz-report", { state: { userAnswers } });
        }, 2000);
      }
    }, 2000);
  };

  return (
    <div className="min-w-screen min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Quiz</h1>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        {currentQuestion < questions.length ? (
          <>
            <LoadingBar progress={progress} color="#3182ce" height={3} />{" "}
            {/* Loading Bar */}
            <div className="mb-4 text-lg font-medium">
              Question {currentQuestion + 1} out of {questions.length}
            </div>
            <h2 className="mb-4 text-xl font-semibold">
              {questions[currentQuestion].question}
            </h2>
            <p className="mb-2">Current Score: {score}</p>
            <ul>
              {questions[currentQuestion].options.map((option, index) => (
                <li key={index} className="mb-2">
                  <button
                    className={`w-full p-2 rounded ${
                      showAnswer
                        ? option === questions[currentQuestion].answer
                          ? "bg-green-200"
                          : "bg-red-200"
                        : "bg-blue-200 hover:bg-blue-300"
                    }`}
                    onClick={() => handleAnswerOptionClick(option)}
                    disabled={showAnswer}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">Quiz Completed!</h2>
            <p className="mb-4">
              Your score: {score} out of {questions.length}
            </p>
            <button
              className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={resetGame}
            >
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
