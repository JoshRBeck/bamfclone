const QuestionComponent = () => {
  return (
    <>
      <h3>Aufgabe 1 von 310</h3>
      <i>Bitte kreuzen Sie an. Es gibt nur eine richtige Antwort.</i>
      <h2>Was ist ein staatliche gewalt in Deutschland...</h2>
      <form>
        <input type="radio" id="antwort1" name="antwort1" value="antwort1" />
        <label htmlFor="">hier Religionsfreiheit gilt.</label>
        <br></br>

        <input type="radio" id="antwort2" name="antwort2" value="antwort2" />
        <label htmlFor="">die Menschen Steuern zahlen.</label>
        <br></br>

        <input type="radio" id="antwort3" name="antwort3" value="antwort3" />
        <label htmlFor="">die Menschen das Wahlrecht haben. </label>
        <br></br>

        <input type="radio" id="antwort4" name="antwort4" value="antwort4" />
        <label htmlFor="">hier Meinungsfreiheit gilt.</label>
        <br></br>
      </form>
      <button>Nächste aufgabe</button>
    </>
  );
};

export default QuestionComponent;
