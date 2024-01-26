import quizIsOverImg from "../assets/quiz-complete.png";

export default function Summary({ questions, userAnswers }) {
  const skippedAnswers = userAnswers.filter(
    (userAnswer) => userAnswer === null
  ).length;
  const correctAnswers = userAnswers.filter(
    (userAnswer, index) => userAnswer === questions[index].answers[0]
  );
  const wrongAnswers = userAnswers.length - (skippedAnswers + correctAnswers);

  const skippedAnswersPercentage =
    ((skippedAnswers / 7) * 100).toFixed(0) + "%";

  const correctAnswersPercentage =
    ((correctAnswers / 7) * 100).toFixed(0) + "%";

  const wrongAnswersPercentage = ((wrongAnswers / 7) * 100).toFixed(0) + "%";

  const info = [
    { text: "Skipped Answers", percentage: skippedAnswersPercentage },
    { text: "Correct Answers", percentage: correctAnswersPercentage },
    { text: "Wrong Answers", percentage: wrongAnswersPercentage },
  ];

  return (
    <div id="summary">
      <img src={quizIsOverImg} alt="Throphy Icon" />
      <h2>QUIZ IS OVER!</h2>
      <div id="summary-stats">
        {info.map((info) => (
          <p key={info.text}>
            <span className="number">{info.percentage}</span>
            <span className="text">{info.text}</span>
          </p>
        ))}
      </div>
      <ol>
        {userAnswers.map((userAnswer, index) => {
          const rightAnswer = questions[index].answers[0];
          let cssClass = "user-answer ";
          if (userAnswer === null) {
            cssClass += "skipped";
          } else if (userAnswer === rightAnswer) {
            cssClass += "correct";
          } else {
            cssClass += "wrong";
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{questions[index].text}</p>
              <p className={cssClass}>{userAnswer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
