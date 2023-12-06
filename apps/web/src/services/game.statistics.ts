import { QuestionClientDto } from "../dtos/question.dto";
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

    console.log(`gameStatisticsService`, gameStatistics);
  }

  const reportGameEnd = (timestamp: number) => {
    gameStatistics.game.end = timestamp;
    console.log(`gameStatisticsService`, gameStatistics);
  };

  const getQuestionIndexById = (id: number) => {
    return gameStatistics.questions.findIndex((q) => q.id === id);
  };

  const reportQuestionShow = ({ id, timestamp }: IReportGuessArgs) => {
    const questionIndex = getQuestionIndexById(id);
    if (questionIndex > 0) {
      gameStatistics.questions[questionIndex].start = timestamp;
    }
    console.log(`gameStatisticsService`, gameStatistics);
  };

  const reportQuestionHide = ({ id, guess, timestamp }: IReportGuessArgs) => {
    const questionIndex = getQuestionIndexById(id);

    if (questionIndex > -1) {
      gameStatistics.questions[questionIndex].end = timestamp;
      gameStatistics.questions[questionIndex].guess = guess;
    }
    console.log(`gameStatisticsService`, gameStatistics);
  };

  const reportHintShow = (id: number) => {
    const questionIndex = getQuestionIndexById(id);

    if (questionIndex > -1) {
      gameStatistics.questions[questionIndex].isHintGiven = true;
    }
    console.log(`gameStatisticsService`, gameStatistics);
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
