import { useCallback, useEffect, useRef, useState } from "react";
import { QuestionClientDto } from "../../dtos/question.dto";

import { GameStatisticsService } from "../../services/game.statistics";
import QuizQuestion from "../QuizQuestion/QuizQuestion";
import { GameStatus } from "./GameStatus";

interface GameProps {
  questions: QuestionClientDto[];
  gameStatus: GameStatus;
  setGameStatus: (newStatus: GameStatus) => void;
}

const Game = ({ questions, gameStatus, setGameStatus }: GameProps) => {
  const [question, setQuestion] = useState<QuestionClientDto | undefined>(
    undefined
  );

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      handleNextQuestion();
    }
  }, []);

  const handleNextQuestion = useCallback(() => {
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
  }, []);

  return (
    <div className="mx-auto max-w-[700px] md:px-3">
      {gameStatus === GameStatus.READY_TO_PLAY ||
      gameStatus === GameStatus.ENDED ? (
        <></>
      ) : question ? (
        <QuizQuestion
          question={question}
          handleNextQuestion={handleNextQuestion}
        />
      ) : (
        <div>No Questions</div>
      )}
    </div>
  );
};

export default Game;
