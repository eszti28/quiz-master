import { QuizMainPageViewModel } from '../models/view/QuizMainPageViewModel';
import { addQuizRepository } from '../repositories/addQuizRepository';
import { getQuizRepository } from '../repositories/getQuizRepository';

export const quizService = {
  async addNewQuiz(
    title: string,
    question: string,
    category: string,
    answers: string[],
    correctAnswer: number[],
  ): Promise<void> {
    await addQuizRepository.addNewQuestion(title, question, category);
    const questionId = await getQuizRepository.getQuizMainInfo();
    await addQuizRepository.addAnswersToQuestion(
      correctAnswer,
      answers,
      questionId[0].id,
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
};
