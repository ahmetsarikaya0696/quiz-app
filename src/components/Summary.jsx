import quizIsOverImg from "../assets/quiz-complete.png";

export default function Summary() {
  return (
    <div id="summary">
      <img src={quizIsOverImg} alt="Throphy Icon" />
      <h2>QUIZ IS OVER!</h2>
    </div>
  );
}
