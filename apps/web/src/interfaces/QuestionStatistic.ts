export interface QuestionStatistic {
  id: number;
  start: number;
  end: number;
  answer: string;
  guess?: string;
  isHintGiven?: boolean;
  score?: number;
}
