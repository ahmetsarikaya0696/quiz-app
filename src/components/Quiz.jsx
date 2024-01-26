import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import quizIsOverImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import Question from "./Question.jsx";

const timeout = 5000;
export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
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
      <Question
        key={activeQuestionIndex}
        questinIndex={activeQuestionIndex}
        timeout={timeout}
        onTimeout={handleSkipAnswer}
        onSelectAnswer={handleSelectAnswer}
      />
    </div>
  );
}
