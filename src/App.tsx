import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import QuestionLogic from "./components/QuestionLogic";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<QuestionLogic />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
