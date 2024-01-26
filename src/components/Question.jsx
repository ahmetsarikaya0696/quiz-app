import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";

export default function Question({
  timeout,
  questionText,
  answers,
  selectedAnswer,
  answerState,
  onTimeout,
  onSelectAnswer,
}) {
  return (
    <div id="question">
      <QuestionTimer timeout={timeout} onTimeout={onTimeout} />
      <h2>{questionText}</h2>
      <Answers
        answers={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelectAnswer={onSelectAnswer}
      />
    </div>
  );
}
