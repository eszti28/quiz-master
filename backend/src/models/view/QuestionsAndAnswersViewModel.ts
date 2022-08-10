import { AnswersViewModel } from './AnswersViewModel';

export interface QuestionsAndAnswersViewModel {
  title: string;
  id: number;
  question: string;
  answers: AnswersViewModel[];
}
