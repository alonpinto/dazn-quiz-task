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
    GameStatisticsService.reportQuestionHide({
      id: question.id,
      guess,
      timestamp: Date.now(),
    });
    setGuess(guess);

    setTimeout(() => {
      setGuess(undefined);
      onNextQuestion();
    }, QuizSetting.moveToNextQuestionAfterGuess);
  };

  return (
    <>
      <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-left">
        {question.question}{" "}
        {/* <GuessFeedback guess={guess} answer={question.answer} /> */}
      </h3>
      <ul className="max-auto pt-3 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {question.choices.map((option) => (
          <QuizOption
            key={option}
            option={option}
            handleUserGuess={handleUserGuess}
            answer={question.answer}
            disabled={!!guess}
            // status={getGuessStatus(index)}
          />
        ))}

        {hint && <div className=" text-green-600">Hint:{hint}</div>}
      </ul>
    </>
  );
};

export default QuizQuestion;
