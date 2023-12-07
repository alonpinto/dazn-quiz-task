import { FC, useState } from "react";
import { QuestionClientDto } from "../../dtos/question.dto";

import { GameStatisticsService } from "../../services/game.statistics";
import { quizApiService } from "../../services/quiz.api.service";
import Game from "../Game/Game";
import { GameStatus } from "../Game/GameStatus";

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
    <Game
      handleNewGameClicked={handleNewGameClicked}
      questions={questions}
      gameStatus={gameStatus}
      setGameStatus={setGameStatus}
    />
  );
};

export default Quiz;
