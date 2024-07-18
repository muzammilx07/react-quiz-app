
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quiz from "./Pages/Quiz";
import QuizReport from "./Pages/QuizReport";
import Home from './Pages/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz-report" element={<QuizReport />} />
      </Routes>
    </Router>
  );
}

export default App;
