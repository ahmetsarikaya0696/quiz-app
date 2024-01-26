import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import quizIsOverImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import Question from "./Question.jsx";

const timeout = 5000;
export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const quizIsOver = QUESTIONS.length === userAnswers.length;

  const activeQuestion = QUESTIONS[activeQuestionIndex];
  const activeAnswers = activeQuestion.answers;

  if (quizIsOver) {
    return (
      <div id="summary">
        <img src={quizIsOverImg} alt="Thropht Icon" />
        <h2>QUIZ IS OVER!</h2>
      </div>
    );
  }

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
      <Question
        timeout={timeout}
        questionText={activeQuestion.text}
        answers={activeAnswers}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        answerState={answerState}
        onTimeout={handleSkipAnswer}
        onSelectAnswer={handleSelectAnswer}
        key={activeQuestionIndex}
      />
    </div>
  );
}
