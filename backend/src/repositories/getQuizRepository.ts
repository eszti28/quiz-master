import { db } from '../data/connections';
import { QuestionsToTitleViewModel } from '../models/view/QuestionsToTitleViewModel';
import { QuizMainPageViewModel } from '../models/view/QuizMainPageViewModel';

export const getQuizRepository = {
  async getQuizMainInfo(): Promise<QuizMainPageViewModel[]> {
    const query: string = `SELECT titles.id AS id, title, category, users.userName AS userName from titles 
    JOIN users ON titles.userId = users.id
    JOIN questions ON titles.id = questions.titleId
    WHERE LENGTH(question) > 0
    GROUP BY titles.id
    ORDER BY titles.id DESC;`;
    return await db.query<QuizMainPageViewModel[]>(query);
  },

  async getQuizzesByCategory(
    categoryType: string,
  ): Promise<QuizMainPageViewModel[]> {
    const query: string = `SELECT titles.id AS id, title, category, users.userName AS userName from titles 
    JOIN users ON titles.userId = users.id
    JOIN questions ON titles.id = questions.titleId
    WHERE LENGTH(question) > 0 AND category = ?
    GROUP BY titles.id
    ORDER BY titles.id DESC;`;
    return await db.query<QuizMainPageViewModel[]>(query, [categoryType]);
  },

  async getQuestionsToTitle(
    titleId: number,
  ): Promise<QuestionsToTitleViewModel[]> {
    const query: string = `SELECT titles.id AS titleId, title, question, answer, correctAnswer, quizId AS questionId from titles 
    JOIN questions ON titles.id = questions.titleId
    JOIN answers ON questions.id = answers.quizId
    WHERE titleId = ?;`;
    return await db.query<QuestionsToTitleViewModel[]>(query, [
      titleId.toString(),
    ]);
  },
};
