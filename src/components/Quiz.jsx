import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import quizIsOverImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

const timeout = 5000;
export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsOver = QUESTIONS.length === userAnswers.length;

  if (quizIsOver) {
    return (
      <div id="summary">
        <img src={quizIsOverImg} alt="Thropht Icon" />
        <h2>QUIZ IS OVER!</h2>
      </div>
    );
  }

  const activeQuestion = QUESTIONS[activeQuestionIndex];
  const rightAnswer = activeQuestion.answers[0];
  const shuffledAnswers = [...activeQuestion.answers].sort(
    () => Math.random() - 0.5
  );

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedUserAnswer
  ) {
    setUserAnswers((prevUserAnswers) => [
      ...prevUserAnswers,
      selectedUserAnswer,
    ]);
  },
  []);

  const handleSkipAnswer = useCallback(
    function handleSkipAnswer() {
      handleSelectAnswer(null);
    },
    [handleSelectAnswer]
  );

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={timeout}
          onTimeout={handleSkipAnswer}
        />
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
