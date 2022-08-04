import { db } from '../data/connections';
import { QuestionsToTitleViewModel } from '../models/view/QuestionsToTitleViewModel';
import { QuizMainPageViewModel } from '../models/view/QuizMainPageViewModel';

export const getQuizRepository = {
  async getQuizMainInfo(): Promise<QuizMainPageViewModel[]> {
    const query: string = `SELECT titles.id AS id, title, category, users.userName AS userName from titles 
    JOIN users ON titles.userId = users.id
    ORDER BY titles.id DESC;`;
    return await db.query<QuizMainPageViewModel[]>(query);
  },

  async getQuizzesByCategory(
    categoryType: string,
  ): Promise<QuizMainPageViewModel[]> {
    const query: string = `SELECT titles.id AS id, title, category, users.userName AS userName from titles 
    JOIN users ON titles.userId = users.id
    WHERE category = ?
    ORDER BY titles.id DESC;`;
    return await db.query<QuizMainPageViewModel[]>(query, [categoryType]);
  },

  async getQuestionsToTitle(
    titleId: number,
  ): Promise<QuestionsToTitleViewModel[]> {
    const query: string = `SELECT titles.id AS id, title, question, titleId from titles 
    JOIN questions ON titles.id = questions.titleId
    WHERE titleId = ?
    ORDER BY titles.id DESC;`;
    return await db.query<QuestionsToTitleViewModel[]>(query, [
      titleId.toString(),
    ]);
  },
};
