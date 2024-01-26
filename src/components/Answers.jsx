import { useRef } from "react";

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelectAnswer,
}) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers].sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((shuffledAnswer) => {
        const isSelected = selectedAnswer === shuffledAnswer;
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
              onClick={() => onSelectAnswer(shuffledAnswer)}
              className={btnClass}
            >
              {shuffledAnswer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
