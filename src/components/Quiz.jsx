import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsOver = QUESTIONS.length === userAnswers.length;

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
      {quizIsOver ? (
        <Summary />
      ) : (
        <Question
          key={activeQuestionIndex}
          questinIndex={activeQuestionIndex}
          onTimeout={handleSkipAnswer}
          onSelectAnswer={handleSelectAnswer}
        />
      )}
    </div>
  );
}
