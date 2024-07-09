import React, { useState } from "react";

interface QuestionProps {
  question: string;
  answers: string[];
  correctAnswer: string;
  index: number;
}

const QuestionComponent: React.FC<QuestionProps> = ({
  question,
  answers,
  correctAnswer,
  index,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowCorrectAnswer(true);
  };

  return (
    <>
      <h1>Question {index + 1}</h1>
      <h2>{question}</h2>
      <ul>
        {answers.map((answer, i) => (
          <li key={i} onClick={() => handleSelectAnswer(answer)}>
            {answer}
          </li>
        ))}
      </ul>
      {showCorrectAnswer && (
        <p
          className={selectedAnswer === correctAnswer ? "correct" : "incorrect"}
        >
          {selectedAnswer === correctAnswer
            ? "Correct!"
            : `Incorrect! The correct answer is ${correctAnswer}.`}
        </p>
      )}
    </>
  );
};

export default QuestionComponent;
