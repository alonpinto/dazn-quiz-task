import Config from "../config";
import type { QuestionClientDto } from "@dazn/common";
import QuizSetting from "../settings/quiz.settings";

interface QuizServiceProps {
  baseUrlApi: string;
}

const QuizApiService = ({ baseUrlApi }: QuizServiceProps) => {
  const getQuestions = async (
    numberOfQuestions: number = QuizSetting.numberOfQuestions
  ): Promise<QuestionClientDto[]> => {
    const response = await fetch(
      `${baseUrlApi}/quiz?size=${numberOfQuestions}`
    );
    return await response.json();
  };

  return {
    getQuestions,
  };
};

const quizApiService = QuizApiService({
  baseUrlApi: Config.baseApiUrl,
});

export { quizApiService as quizApiService };
