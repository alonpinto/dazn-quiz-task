import { useEffect, useState } from "react";
import { QuestionClientDto } from "../../dtos/question.dto";
import { GameStatisticsService } from "../../services/game.statistics";
import QuizSetting from "../../settings/quiz.settings";
import QuizOption from "../QuizOption/QuizOption";

interface QuizQuestionProps {
  question: QuestionClientDto;
  handleNextQuestion: () => void;
}

const QuizQuestion = ({ question, handleNextQuestion }: QuizQuestionProps) => {
  const [hint, setHint] = useState<string | undefined>(undefined);
  const [guess, setGuess] = useState<string | undefined>(undefined);

  const showHint = () => {
    setHint(question.hint);
    GameStatisticsService.reportHintShow(question.id);
  };

  const questionHide = () => {
    setHint(question.hint);
    GameStatisticsService.reportQuestionHide({
      id: question.id,
      guess,
      timestamp: Date.now(),
    });
    onNextQuestion();
  };

  useEffect(() => {
    // console.log(`question`, data.question);
    setHint(undefined);
    const showHintTimer = setTimeout(
      showHint,
      QuizSetting.showHintTimeInSeconds
    );

    const timeEndedTimer = setTimeout(
      questionHide,
      QuizSetting.answerSessionTimeInSeconds
    );

    return () => {
      clearTimeout(showHintTimer);
      clearTimeout(timeEndedTimer);
    };
  }, [question]);

  const onNextQuestion = () => {
    setHint(undefined);
    handleNextQuestion();
  };

  const handleUserGuess = (guess: string) => {
    setGuess(guess);

    GameStatisticsService.reportQuestionHide({
      id: question.id,
      guess,
      timestamp: Date.now(),
    });

    setTimeout(() => {
      setGuess(undefined);
      onNextQuestion();
    }, QuizSetting.moveToNextQuestionAfterGuess);
  };

  // const getGuessStatus = (index): GuessStatus => {
  //   if (!guess) return GuessStatus.NONE;

  //   return guess === question.answer ? GuessStatus.CORRECT : GuessStatus.WRONG;
  // };

  return (
    <>
      <div>
        {question.question}{" "}
        {guess && <>{guess === question.answer ? "Correct" : "Wrong"}</>}
      </div>

      <div>
        {question.choices.map((option) => (
          <QuizOption
            key={option}
            option={option}
            handleUserGuess={handleUserGuess}
            // status={getGuessStatus(index)}
          />
        ))}
      </div>

      {hint && <div>Hint:{hint}</div>}
    </>
  );
};

export default QuizQuestion;
