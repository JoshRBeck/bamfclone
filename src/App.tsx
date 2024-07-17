import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import QuestionLogic from "./components/QuestionLogic";

const App: React.FC = () => {
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

        <Route path="/" exact>
          <QuestionLogic />
        </Route>
      </div>
    </Router>
  );
};

export default App;
