import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import quizData from "../data"; // Double-check the structure of '../data'
import { toast } from "react-toastify";
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
    setCurrentQuestion(0);
    setScore(0);
    setShowAnswer(false);
    setUserAnswers([]);
    setProgress(0);
  };

  const handleAnswerOptionClick = (selectedOption) => {
    const isCorrect = selectedOption === questions[currentQuestion].answer;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    const answerObject = {
      question: questions[currentQuestion].question,
      userAnswer: selectedOption,
      correctAnswer: questions[currentQuestion].answer,
      isCorrect: isCorrect,
    };

    setUserAnswers((prevUserAnswers) => [...prevUserAnswers, answerObject]);
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
          toast("🦄 Quiz Completed!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/quiz-report", { state: { userAnswers } });
        }, 2000);
      }
    }, 2000);
  };

  const handleSkipQuestion = () => {
    const skippedAnswerObject = {
      question: questions[currentQuestion].question,
      userAnswer: "Skipped",
      correctAnswer: questions[currentQuestion].answer,
      isCorrect: false, // Assuming skipped questions are not marked as correct
    };

    setUserAnswers((prevUserAnswers) => [
      ...prevUserAnswers,
      skippedAnswerObject,
    ]);

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setShowAnswer(false);
      setProgress(0);
    } else {
      toast("🦄 Quiz Completed!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/quiz-report", {
        state: { userAnswers: [...userAnswers, skippedAnswerObject] },
      });
    }
  };


  const handleResetGame = () => {
    resetGame();
  };

  const handleExitQuiz = () => {
    navigate("/");
  };

  return (
    <div className="min-w-screen min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="absolute top-4 right-4">
        <button
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
          onClick={handleResetGame}
        >
          Reset Quiz
        </button>
        <button
          className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleExitQuiz}
        >
          Exit Quiz
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-4">Quiz</h1>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        {currentQuestion < questions.length && (
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
            <button
              className="mt-4 p-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              onClick={handleSkipQuestion}
            >
              Skip Question
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
