import { FC, useState } from "react";
import { QuestionClientDto } from "../../dtos/question.dto";

import { GameStatisticsService } from "../../services/game.statistics";
import { quizApiService } from "../../services/quiz.api.service";
import Game from "../Game/Game";
import { GameStatus } from "../Game/GameStatus";
import GameStatistics from "../GameStatistics/GameStatistics";

interface QuizProps {}

const Quiz: FC<QuizProps> = () => {
  const [questions, setQuestions] = useState<QuestionClientDto[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    GameStatus.READY_TO_PLAY
  );

  const handleNewGameClicked = async () => {
    const _questions = await quizApiService.getQuestions();
    setQuestions(_questions);
    setGameStatus(GameStatus.STARTED);
    GameStatisticsService.initGameStatistic(_questions);
  };

  return (
    <>
      {gameStatus === GameStatus.READY_TO_PLAY ||
      gameStatus === GameStatus.ENDED ? (
        <button
          type="button"
          onClick={handleNewGameClicked}
          className="inline-block rounded-full border-2 border-primary 
          px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary 
          transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 bg-slate-300
          hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 
          focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
          data-te-ripple-init
        >
          Start Quiz
        </button>
      ) : (
        <Game
          handleNewGameClicked={handleNewGameClicked}
          questions={questions}
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
        />
      )}
      {gameStatus === GameStatus.ENDED && <GameStatistics />}
    </>
  );
};

export default Quiz;
