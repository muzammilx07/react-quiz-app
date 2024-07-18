import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to Quiz App</h1>
        <Link to="/quiz">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Start Quiz
          </button>
        </Link>
      </div>
      <footer className="mt-8">
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/muzammilx07"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://simpleicons.org/icons/github.svg"
              alt="GitHub"
              className="w-6 h-6"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/muzammil/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://simpleicons.org/icons/linkedin.svg"
              alt="LinkedIn"
              className="w-6 h-6"
            />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
