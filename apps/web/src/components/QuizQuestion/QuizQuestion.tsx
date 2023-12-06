import { QuestionClientDto } from "../../dtos/question.dto";
import QuizOption from "../QuizOption/QuizOption";

interface QuizQuestionProps {
  question: QuestionClientDto;
  handleNextQuestion: () => void;
}

const QuizQuestion = ({ question, handleNextQuestion }: QuizQuestionProps) => (
  <>
    <div>{question.question}</div>

    <div>
      {question.choices.map((option) => (
        <QuizOption option={option} />
      ))}
    </div>

    <div>
      <input type="button" onClick={handleNextQuestion} value="Next Question" />
    </div>
  </>
);

export default QuizQuestion;
