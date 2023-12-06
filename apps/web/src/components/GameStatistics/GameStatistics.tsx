import { GameStatisticsService } from "../../services/game.statistics";

const GameStatistics = () => {
  const statistics = GameStatisticsService.getReport();

  const correctAnswers = statistics.questions.filter(
    (q) => q.guess === q.answer
  );

  const wrongAnswers = statistics.questions.filter((q) => q.guess !== q.answer);

  const unansweredQuestions = statistics.questions.filter((q) => !q.guess);

  const numberOfQuestions = statistics.questions.length;
  const numberOfUnansweredQuestions = unansweredQuestions.length;

  const gameDurationInSeconds =
    (statistics.game.end - statistics.game.start) / 1000;
  const numberOfCurrentAnswers = correctAnswers.length;
  const numberOfWrongAnswers = wrongAnswers.length;
  const givenHint = statistics.questions.filter((q) => !!q.isHintGiven).length;

  const durationForCorrectAnswer = correctAnswers.reduce(
    (accumulator, currentValue) =>
      accumulator + (currentValue.end - currentValue.start) / 1000,
    0
  );

  const durationForWrongAnswer = wrongAnswers.reduce(
    (accumulator, currentValue) =>
      accumulator + (currentValue.end - currentValue.start) / 1000,
    0
  );

  return (
    <div className="py-24">
      <h3 className="text-lg">Game Statistic</h3>
      <section>
        <div>Game Duration: {gameDurationInSeconds.toFixed(0)} seconds</div>
        <div>Correct Answers: {numberOfCurrentAnswers}</div>
        <div>Wrong Answers: {numberOfWrongAnswers}</div>
        <div>Unanswered : {numberOfUnansweredQuestions}</div>
        <div>
          Average Time Per Guess:{" "}
          {(gameDurationInSeconds / numberOfQuestions).toFixed(2)}
        </div>
        <div>
          Average Time Per Correct Answers:{" "}
          {(durationForCorrectAnswer / numberOfCurrentAnswers).toFixed(2)}
        </div>

        <div>
          Average Time Per Wrong Answer:{" "}
          {(durationForWrongAnswer / numberOfWrongAnswers).toFixed(2)}
        </div>
        <div>Given Hints:{givenHint}</div>
      </section>
    </div>
  );
};

export default GameStatistics;
