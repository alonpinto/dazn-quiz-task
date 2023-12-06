import { QuestionClientDto } from "../dtos/question.dto";

export interface IGameStatistics {
  game: { start: number; end: number };
  questions: QuestionStatistic[];
}

const blankStatistics = {
  game: { start: 0, end: 0 },
  questions: [],
};

export interface QuestionStatistic {
  id: number;
  start: number;
  end: number;
  answer: string;
  guess?: string;
  isHintGiven?: boolean;
  score?: number;
}

interface IReportGuessArgs {
  id: number;
  guess: string | undefined;
  timestamp: number;
}

const quizStatisticsService = () => {
  let gameStatistics: IGameStatistics;

  function initGameStatistic(questions: QuestionClientDto[]) {
    gameStatistics.game.start = Date.now();
    gameStatistics = blankStatistics;
    gameStatistics.questions = questions.map((_question) => {
      const { id, answer } = _question;
      return {
        id,
        start: 0,
        end: 0,
        answer,
        isHintGiven: false,
        guess: undefined,
      };
    });
  }

  const reportGameEnd = (timestamp: number) => {
    gameStatistics.game.end = timestamp;
  };

  const getQuestionIndexById = (id: number) => {
    return gameStatistics.questions.findIndex((q) => (q.id = id));
  };

  const reportGuessStart = ({ id, timestamp }: IReportGuessArgs) => {
    const questionIndex = getQuestionIndexById(id);
    if (questionIndex > 0) {
      gameStatistics.questions[questionIndex].start = timestamp;
    }
  };

  const reportGuessEnd = ({ id, guess, timestamp }: IReportGuessArgs) => {
    const questionIndex = getQuestionIndexById(id);

    if (questionIndex > 0) {
      gameStatistics.questions[questionIndex].end = timestamp;
      gameStatistics.questions[questionIndex].guess = guess;
    }
  };

  const getReport = (): IGameStatistics => {
    return gameStatistics;
  };

  return {
    initGameStatistic,
    reportGuessStart,
    reportGameEnd,
    reportGuessEnd,
    getReport,
  };
};

const QuizStatisticsService = quizStatisticsService();

export { QuizStatisticsService as QuizStatisticsService };
