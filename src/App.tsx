import "./App.css";
import QuestionComponent from "./components/question";
import questionItems from "./questions.json"; 

const App: React.FC = () => {
  return (
    <>
      {questionItems.map((question, index) => (
        <QuestionComponent
          key={index}
          index={index}
          question={question.question}
          answers={question.answers}
          correctAnswer={question.correct_answer}
        />
      ))}
    </>
  );
};

export default App;
