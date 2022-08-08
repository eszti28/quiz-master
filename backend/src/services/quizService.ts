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
    question: string,
    answers: string[],
    correctAnswer: boolean[],
  ): Promise<void> {
    const maxTitleId = await getQuizRepository.getQuizMainInfo();

    if (maxTitleId.length < 1) {
      throw Error("There aren't any titles yet");
    }

    const newQuestionId = await addQuizRepository.addAndGetNewQuestion(
      question,
      maxTitleId[0].id,
    );

    if (newQuestionId.length < 1) {
      throw Error("There aren't any questions yet");
    }

    let rigthCorrect: number[] = [];
    correctAnswer.forEach(isCorrect => {
      if (!isCorrect) rigthCorrect.push(0);
      else rigthCorrect.push(1);
    });

    if (rigthCorrect.length < 1) {
      throw Error('No correct answer given');
    }

    await addQuizRepository.addAnswersToQuestion(
      rigthCorrect,
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
