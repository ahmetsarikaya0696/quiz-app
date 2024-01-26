import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import quizIsOverImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

const timeout = 5000;
export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
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
  const shuffledAnswers = [...activeQuestion.answers].sort(
    () => Math.random() - 0.5
  );

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedUserAnswer) {
      setAnswerState("answered");
      setUserAnswers((prevUserAnswers) => [
        ...prevUserAnswers,
        selectedUserAnswer,
      ]);

      setTimeout(() => {
        const rightAnswer = activeQuestion.answers[0];
        if (selectedUserAnswer === rightAnswer) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestion]
  );

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
          {shuffledAnswers.map((shuffledAnswer) => {
            const isSelected =
              userAnswers[userAnswers.length - 1] === shuffledAnswer;
            let btnClass = "";

            if (answerState === "answered" && isSelected) {
              btnClass = "selected";
            }

            if (
              (answerState === "correct" || answerState === "wrong") &&
              isSelected
            ) {
              btnClass = answerState;
            }
            return (
              <li className="answer" key={shuffledAnswer}>
                <button
                  onClick={() => handleSelectAnswer(shuffledAnswer)}
                  className={btnClass}
                >
                  {shuffledAnswer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
