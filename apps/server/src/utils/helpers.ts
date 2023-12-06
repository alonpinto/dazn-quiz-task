import Config from "../config";
import { QuestionServerDto } from "../dtos/index.dto";

export const fetchRandomQuestion = (
  list: QuestionServerDto[],
  size: number = Config.defaultQuizSize
): QuestionServerDto[] => {
  const shuffled = [...list].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
};
