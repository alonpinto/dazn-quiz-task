import { useEffect, useState } from "react";
import { QuestionClientDto } from "../../dtos/question.dto";
import { GameStatus } from "../../enums/GameStatus";
import QuizQuestion from "../QuizQuestion/QuizQuestion";

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
      setQuestion(questions.pop());
    }
  }, [questions]);

  const handleNextQuestion = () => {
    const question = questions.pop();
    if (question) {
      setQuestion(question);
    } else {
      setGameStatus(GameStatus.ENDED);
    }
  };

  return (
    <div>
      {gameStatus === GameStatus.ENDED && <div> Game ended</div>}

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
