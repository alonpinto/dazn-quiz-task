import { useEffect, useState } from "react";
import { QuestionClientDto } from "../../dtos/question.dto";

import { GameStatisticsService } from "../../services/game.statistics";
import QuizQuestion from "../QuizQuestion/QuizQuestion";
import { GameStatus } from "./GameStatus";
import GameStatistics from "../GameStatistics/GameStatistics";

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
    <div>
      {gameStatus === GameStatus.ENDED && (
        <>
          <div> Game ended </div>
          <GameStatistics />
        </>
      )}

      {gameStatus === GameStatus.READY_TO_PLAY ||
      gameStatus === GameStatus.ENDED ? (
        <button onClick={handleNewGameClicked}>Start New Game</button>
      ) : question ? (
        <QuizQuestion
          question={question}
          handleNextQuestion={handleNextQuestion}
        />
      ) : (
        <div>No Question</div>
      )}
    </div>
  );
};

export default Game;
