import { useEffect, useState } from "react";
import { QuestionClientDto } from "../../dtos/question.dto";

import { GameStatisticsService } from "../../services/game.statistics";
import GameStatistics from "../GameStatistics/GameStatistics";
import QuizQuestion from "../QuizQuestion/QuizQuestion";
import { GameStatus } from "./GameStatus";

interface GameProps {
  handleNewGameClicked: () => void;
  questions: QuestionClientDto[];
  gameStatus: GameStatus;
  setGameStatus: (newStatus: GameStatus) => void;
}

const Game = ({
  handleNewGameClicked,
  questions,
  gameStatus,
  setGameStatus,
}: GameProps) => {
  const [question, setQuestion] = useState<QuestionClientDto | undefined>(
    undefined
  );

  useEffect(() => {
    if (questions?.length) {
      const question = questions.pop();
      GameStatisticsService.reportQuestionShow({
        id: question!.id,
        timestamp: Date.now(),
        guess: undefined,
      });
      setQuestion(question);
    }
  }, [questions]);

  const handleNextQuestion = () => {
    const question = questions.pop();
    if (question) {
      setQuestion(question);

      GameStatisticsService.reportQuestionShow({
        id: question!.id,
        timestamp: Date.now(),
        guess: undefined,
      });
    } else {
      setGameStatus(GameStatus.ENDED);
      GameStatisticsService.reportGameEnd(Date.now());
    }
  };

  return (
    <div className="mx-auto max-w-[700px] md:px-3">
      {gameStatus === GameStatus.READY_TO_PLAY ||
      gameStatus === GameStatus.ENDED ? (
        <button
          type="button"
          onClick={handleNewGameClicked}
          className="inline-block rounded-full border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
          data-te-ripple-init
        >
          Start Quiz
        </button>
      ) : question ? (
        <QuizQuestion
          question={question}
          handleNextQuestion={handleNextQuestion}
        />
      ) : (
        <div>No Question</div>
      )}

      {gameStatus === GameStatus.ENDED && (
        <>
          <GameStatistics />
        </>
      )}
    </div>
  );
};

export default Game;
