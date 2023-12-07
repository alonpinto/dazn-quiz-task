export type QuestionServerDto = {
  question_id: number;
  question: string;
  answer_index: number;
  choices: string[];
  hint: string;
};
