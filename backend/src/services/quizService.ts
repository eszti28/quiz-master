import { QuestionsAndAnswersViewModel } from '../models/view/QuestionsAndAnswersViewModel';
import { QuizMainPageViewModel } from '../models/view/QuizMainPageViewModel';
import { addQuizRepository } from '../repositories/addQuizRepository';
import { getQuizRepository } from '../repositories/getQuizRepository';
import { badRequestError, notFoundError } from './generalErrorService';

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
      throw notFoundError("There aren't any titles yet");
    }

    const newQuestionId = await addQuizRepository.addAndGetNewQuestion(
      question,
      maxTitleId[0].id,
    );

    if (newQuestionId.length < 1) {
      throw notFoundError("There aren't any questions yet");
    }

    let rigthCorrect: number[] = [];
    correctAnswer.forEach(isCorrect => {
      if (!isCorrect) rigthCorrect.push(0);
      else rigthCorrect.push(1);
    });

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
  ): Promise<QuestionsAndAnswersViewModel[]> {
    const requestedTitleId = await getQuizRepository.getQuestionsToTitle(
      titleId,
    );

    if (requestedTitleId.length < 1) {
      throw badRequestError('This title does not exist');
    }

    const questionList: QuestionsAndAnswersViewModel[] = [];

    requestedTitleId.forEach(q => {
      if (!questionList.some(x => x.id === q.questionId)) {
        const newQuestion = {
          title: q.title,
          id: q.questionId,
          question: q.question,
          answers: requestedTitleId
            .filter(a => a.questionId === q.questionId)
            .map(a => {
              return {
                id: a.answerId,
                answer: a.answer,
              };
            }),
        };
        questionList.push(newQuestion);
      }
    });

    return questionList;
  },

  async isAnswerCorrect(answerId: number): Promise<number> {
    const isCorrect = await getQuizRepository.isAnswerCorrect(answerId);

    if (isCorrect < 0 || isCorrect > 1) {
      throw badRequestError('Given response is invalid');
    }

    return isCorrect;
  },
};
