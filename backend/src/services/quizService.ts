import { GetNewQuestionDomainModel } from '../models/domain/GetNewQuestionDomainModel';
import { QuestionsAndAnswersViewModel } from '../models/view/QuestionsAndAnswersViewModel';
import { QuizMainPageDomainModel } from '../models/domain/QuizMainPageDomainModel';
import { addQuizRepository } from '../repositories/addQuizRepository';
import { getQuizRepository } from '../repositories/getQuizRepository';
import { badRequestError, notFoundError } from './generalErrorService';
import { QuestionsToTitleDomainModel } from '../models/domain/QuestionsToTitleDomainModel';

export const quizService = {
  async addNewTitle(
    title: string,
    category: string,
    userId: number,
  ): Promise<void> {
    await addQuizRepository.addNewTitle(title, category, userId);
  },

  async addNewQuestion(
    quizId: number,
    question: string,
    answers: string[],
    correctAnswer: boolean[],
  ): Promise<void> {
    if (quizId === 0) {
      quizId = await getQuizRepository.getMaxTitleId();
      if (!quizId) {
        throw notFoundError("There aren't any titles yet");
      }
    }

    const newQuestionId: GetNewQuestionDomainModel[] =
      await addQuizRepository.addAndGetNewQuestion(question, quizId);

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

  async getQuizMainInfo(): Promise<QuizMainPageDomainModel[]> {
    return await getQuizRepository.getQuizMainInfo();
  },

  async getQuizzesByCategory(
    categoryType: string,
  ): Promise<QuizMainPageDomainModel[]> {
    return await getQuizRepository.getQuizzesByCategory(categoryType);
  },

  async getQuestionsToTitle(
    titleId: number,
  ): Promise<QuestionsAndAnswersViewModel[]> {
    const requestedTitleId: QuestionsToTitleDomainModel[] =
      await getQuizRepository.getQuestionsToTitle(titleId);

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

  async isAnswerCorrect(questionId: number): Promise<number> {
    const isCorrect = await getQuizRepository.isAnswerCorrect(questionId);

    if (isCorrect === null) {
      throw badRequestError('Given response is invalid');
    }

    return isCorrect;
  },
};
