import { FC, useEffect, useState } from "react";
import { QuestionClientDto } from "../../dtos/question.dto";
import { quizApiService } from "../../services/quiz.api.service";

interface QuizProps {}

const Quiz: FC<QuizProps> = () => {
  const [questions, setQuestions] = useState<QuestionClientDto[]>([]);

  useEffect(() => {
    (async () => {
      const _questions = await quizApiService.getQuestions();
      setQuestions(_questions);
    })();
  }, []);

  return <div> {JSON.stringify(questions)}</div>;
};

export default Quiz;
