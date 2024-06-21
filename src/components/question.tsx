const QuestionComponent = () => {
  return (
    <>
      <h5>Question 1 from 310</h5>
      <i>Bitte kreuzen Sie an. Es gibt nur eine richtige Antwort.</i>
      <h2>Was ist ein staatliche gewalt in Deutschland</h2>
      <form>
        <input type="radio" id="answer1" name="answer1" value="answer1" />
        <label htmlFor="">Answer 1</label>
        <br></br>

        <input type="radio" id="answer2" name="answer2" value="answer2" />
        <label htmlFor="">Answer 2</label>
        <br></br>

        <input type="radio" id="answer3" name="answer3" value="answer3" />
        <label htmlFor="">Answer 3</label>
        <br></br>

        <input type="radio" id="answer4" name="answer4" value="answer4" />
        <label htmlFor="">Answer 4</label>
        <br></br>
      </form>
    </>
  );
};

export default QuestionComponent;
