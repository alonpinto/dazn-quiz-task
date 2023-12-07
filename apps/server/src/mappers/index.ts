import { QuestionClientDto, QuestionServerDto } from "../dtos/index.dto";

export const mapServerToClientDto = (
  serverDto: QuestionServerDto
): QuestionClientDto => {
  const { question_id, question, choices, answer_index, hint } = serverDto;

  return {
    id: question_id,
    question,
    answer: choices[answer_index],
    choices: choices,
    hint,
  };
};

export const prepareQuizForClient = (
  questions: QuestionServerDto[]
): QuestionClientDto[] => {
  return questions.map((question) => mapServerToClientDto(question));
};
