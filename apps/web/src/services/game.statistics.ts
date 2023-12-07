import type { QuestionClientDto } from "@dazn/common";
import { IGameStatistics } from "../interfaces/IGameStatistics";
import { IReportGuessArgs } from "../interfaces/IReportGuessArgs";

const blankStatistics = {
  game: { start: 0, end: 0 },
  questions: [],
};

const gameStatisticsService = () => {
  let gameStatistics: IGameStatistics;

  function initGameStatistic(questions: QuestionClientDto[]) {
    gameStatistics = blankStatistics;
    gameStatistics.game.start = Date.now();

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
    return gameStatistics.questions.findIndex((q) => q.id === id);
  };

  const reportQuestionShow = ({ id, timestamp }: IReportGuessArgs) => {
    const questionIndex = getQuestionIndexById(id);
    if (questionIndex > -1) {
      gameStatistics.questions[questionIndex].start = timestamp;
    }
  };

  const reportQuestionHide = ({ id, guess, timestamp }: IReportGuessArgs) => {
    const questionIndex = getQuestionIndexById(id);

    if (questionIndex > -1) {
      gameStatistics.questions[questionIndex].end = timestamp;
      gameStatistics.questions[questionIndex].guess = guess;
    }
  };

  const reportHintShow = (id: number) => {
    const questionIndex = getQuestionIndexById(id);

    if (questionIndex > -1) {
      gameStatistics.questions[questionIndex].isHintGiven = true;
    }
  };

  const getReport = (): IGameStatistics => {
    return gameStatistics;
  };

  return {
    initGameStatistic,
    reportQuestionShow,
    reportGameEnd,
    reportQuestionHide,
    reportHintShow,
    getReport,
  };
};

const GameStatisticsService = gameStatisticsService();

export { GameStatisticsService as GameStatisticsService };
