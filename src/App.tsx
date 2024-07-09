import React, { useState } from "react";
import "./App.css";
import QuestionComponent from "./components/Question";
import questionItems from "./questions.json";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";

const App: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex < questionItems.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const handleSelectQuestion = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrentQuestionIndex(Number(event.target.value));
  };

  const handleRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questionItems.length);
    setCurrentQuestionIndex(randomIndex);
  };

  const currentQuestion = questionItems[currentQuestionIndex];

  return (
    <Router>
      <div>
        <Navbar />

        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>

        <button
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous Question
        </button>

        <button
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === questionItems.length - 1}
        >
          Next Question
        </button>

        <button
          onClick={handleRandomQuestion}
          disabled={currentQuestionIndex === questionItems.length - 1}
        >
          Random Question
        </button>

        <select onChange={handleSelectQuestion} value={currentQuestionIndex}>
          {questionItems.map((_, index) => (
            <option key={index} value={index}>
              Question {index + 1}
            </option>
          ))}
        </select>
      </div>
      <QuestionComponent
        key={currentQuestionIndex}
        index={currentQuestionIndex}
        question={currentQuestion.question}
        answers={currentQuestion.answers}
        correctAnswer={currentQuestion.correct_answer}
      />
    </Router>
  );
};

export default App;
