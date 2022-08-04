import { QuestionsToTitleViewModel } from '../models/view/QuestionsToTitleViewModel';
import { QuizMainPageViewModel } from '../models/view/QuizMainPageViewModel';
import { addQuizRepository } from '../repositories/addQuizRepository';
import { getQuizRepository } from '../repositories/getQuizRepository';

export const quizService = {
  async addNewTitle(
    title: string,
    category: string,
    userId: number,
  ): Promise<void> {
    await addQuizRepository.addNewTitle(title, category, userId);
  },

  async addNewQuestion(
    titleId: number,
    question: string,
    answers: string[],
    correctAnswer: number[],
  ): Promise<void> {
    const newQuestionId = await addQuizRepository.addAndGetNewQuestion(
      question,
      titleId,
    );

    await addQuizRepository.addAnswersToQuestion(
      correctAnswer,
      answers,
      newQuestionId[0].id,
    );
  },

  async getQuizMainInfo(): Promise<QuizMainPageViewModel[]> {
    return await getQuizRepository.getQuizMainInfo();
  },

  async getQuizzesByCategory(
    categoryType: string,
  ): Promise<QuizMainPageViewModel[]> {
    return await getQuizRepository.getQuizzesByCategory(categoryType);
  },

  async getQuestionsToTitle(
    titleId: number,
  ): Promise<QuestionsToTitleViewModel[]> {
    return await getQuizRepository.getQuestionsToTitle(titleId);
  },
};
