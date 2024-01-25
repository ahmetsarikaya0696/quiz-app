import { useState } from "react";
import QUESTIONS from "../questions.js";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsOver = QUESTIONS.length === userAnswers.length;

  if (quizIsOver) {
    return <div>Quiz is over!</div>;
  }

  const activeQuestion = QUESTIONS[activeQuestionIndex];
  const rightAnswer = activeQuestion.answers[0];
  const shuffledAnswers = activeQuestion.answers.sort(
    () => Math.random() - 0.5
  );

  function handleSelectAnswer(selectedUserAnswer) {
    setUserAnswers((prevUserAnswers) => [
      ...prevUserAnswers,
      selectedUserAnswer,
    ]);
  }

  return (
    <div id="quiz">
      <div id="question">
        <h2>{activeQuestion.text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((shuffledAnswer) => (
            <li className="answer" key={shuffledAnswer}>
              <button onClick={() => handleSelectAnswer(shuffledAnswer)}>
                {shuffledAnswer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}