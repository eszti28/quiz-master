import { db } from '../data/connections';
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
};
