type QuestionClientDto = {
  id: number;
  question: string;
  answer: string;
  choices: string[];
  hint: string;
};

export default QuestionClientDto;
