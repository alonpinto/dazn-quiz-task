import { GameStatisticsService } from "../../services/game.statistics";
import GameStatisticField from "../GameStatisticField/GameStatisticField";

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
  const numberOfCorrectAnswers = correctAnswers.length;
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
      <h5 className="text-lg">Game Statistic</h5>
      <section className="flex justify-center">
        <table className="border-collapse border border-slate-400">
          <thead>
            <tr>
              <th className="border border-slate-300">Name</th>
              <th className="border border-slate-300">value</th>
            </tr>
          </thead>
          <tbody>
            <GameStatisticField
              title="Game Duration"
              value={`${gameDurationInSeconds.toFixed(0)} seconds`}
            />
            <GameStatisticField
              title="Correct Answers"
              value={numberOfCorrectAnswers}
            />

            <GameStatisticField
              title="Wrong Answers"
              value={numberOfWrongAnswers}
            />

            <GameStatisticField
              title="Unanswered"
              value={numberOfUnansweredQuestions}
            />

            <GameStatisticField
              title="Average Time Per Guess"
              value={(gameDurationInSeconds / numberOfQuestions).toFixed(2)}
            />

            {numberOfCorrectAnswers > 0 && (
              <GameStatisticField
                title="Average Time Per Correct Answers"
                value={(
                  durationForCorrectAnswer / numberOfCorrectAnswers
                ).toFixed(2)}
              />
            )}

            {numberOfWrongAnswers > 0 && (
              <GameStatisticField
                title="Average Time Per Wrong Answer"
                value={(durationForWrongAnswer / numberOfWrongAnswers).toFixed(
                  2
                )}
              />
            )}

            <GameStatisticField title="Given Hints" value={givenHint} />
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default GameStatistics;
