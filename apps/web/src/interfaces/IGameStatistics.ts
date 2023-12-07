import { QuestionStatistic } from "./QuestionStatistic";

export interface IGameStatistics {
  game: { start: number; end: number };
  questions: QuestionStatistic[];
}
