import { useEffect, useState } from "react";
import { QuestionClientDto } from "../../dtos/question.dto";
import QuizSetting from "../../settings/quiz.settings";
import QuizOption from "../QuizOption/QuizOption";

interface QuizQuestionProps {
  question: QuestionClientDto;
  handleNextQuestion: () => void;
}

const QuizQuestion = ({ question, handleNextQuestion }: QuizQuestionProps) => {
  const [hint, setHint] = useState<string | undefined>(undefined);

  const showHint = () => {
    setHint(question.hint);
  };

  useEffect(() => {
    // console.log(`question`, data.question);
    setHint(undefined);
    const showHintTimer = setTimeout(
      showHint,
      QuizSetting.showHintTimeInSeconds
    );

    const timeEndedTimer = setTimeout(
      onNextQuestion,
      QuizSetting.answerSessionTimeInSeconds
    );

    return () => {
      clearTimeout(showHintTimer);
      clearTimeout(timeEndedTimer);
    };
  }, []);

  const onNextQuestion = () => {
    setHint(undefined);
    handleNextQuestion();
  };

  return (
    <>
      <div>{question.question}</div>

      <div>
        {question.choices.map((option) => (
          <QuizOption option={option} />
        ))}
      </div>

      {hint && <div>Hint:{hint}</div>}
    </>
  );
};

export default QuizQuestion;
