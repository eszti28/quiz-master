import { db } from '../data/connections';
import { GetMaxTitleIdDomainModel } from '../models/domain/GetMaxTitleIdDomainModel';
import { IsAnswerCorrectDomainModel } from '../models/domain/IsAnswerCorrectDomainModel';
import { QuestionsToTitleDomainModel } from '../models/domain/QuestionsToTitleDomainModel';
import { QuizMainPageDomainModel } from '../models/domain/QuizMainPageDomainModel';

export const getQuizRepository = {
  async getQuizMainInfo(): Promise<QuizMainPageDomainModel[]> {
    const query: string = `SELECT titles.id AS id, title, category, users.userName AS userName from titles 
    JOIN users ON titles.userId = users.id
    JOIN questions ON titles.id = questions.titleId
    WHERE LENGTH(question) > 0
    GROUP BY titles.id
    ORDER BY titles.id DESC;`;
    return await db.query<QuizMainPageDomainModel[]>(query);
  },

  async getQuizzesByCategory(
    categoryType: string,
  ): Promise<QuizMainPageDomainModel[]> {
    const query: string = `SELECT titles.id AS id, title, category, users.userName AS userName from titles 
    JOIN users ON titles.userId = users.id
    JOIN questions ON titles.id = questions.titleId
    WHERE LENGTH(question) > 0 AND category = ?
    GROUP BY titles.id
    ORDER BY titles.id DESC;`;
    return await db.query<QuizMainPageDomainModel[]>(query, [categoryType]);
  },

  async getMaxTitleId(): Promise<number> {
    const query: string = `SELECT MAX(titles.id) AS titleId from titles;`;
    const maxTitleId = await db.query<GetMaxTitleIdDomainModel[]>(query);
    return maxTitleId[0].titleId;
  },

  async getQuestionsToTitle(
    titleId: number,
  ): Promise<QuestionsToTitleDomainModel[]> {
    const query: string = `SELECT titles.id AS titleId, title, question, answer, questionId, answers.id AS answerId from titles 
    JOIN questions ON titles.id = questions.titleId
    JOIN answers ON questions.id = answers.questionId
    WHERE titleId = ?;`;
    return await db.query<QuestionsToTitleDomainModel[]>(query, [
      titleId.toString(),
    ]);
  },

  async isAnswerCorrect(questionId: number): Promise<number> {
    const query: string = `SELECT * FROM answers WHERE questionId = ? AND correctAnswer = 1;`;

    const answerIdResult = await db.query<IsAnswerCorrectDomainModel[]>(query, [
      questionId.toString(),
    ]);

    return answerIdResult[0].id;
  },
};
