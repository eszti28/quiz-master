import { OkPacket } from 'mysql';
import { db } from '../data/connections';
import { QuestionDomainModel } from '../models/domain/QuestionDomainModel';
import { QuizMainPageViewModel } from '../models/view/QuizMainPageViewModel';

export const questionRepository = {
  async addNewQuestion(
    title: string,
    question: string,
    category: string,
  ): Promise<void> {
    const query: string = `INSERT INTO questions (title, question, category, userId) VALUES (?, ?, ?, ?);`;

    await db.query<QuestionDomainModel[]>(query, [
      title,
      question,
      category,
      `${3}`,
    ]);
  },

  async addAnswersToQuestion(
    correctAnswers: number[],
    answers: string[],
    quizId: number,
  ): Promise<void> {
    const query: string = `INSERT INTO answers (correctAnswer, answer, quizId) VALUES 
        (?, ?, ?), 
        (?, ?, ?),
        (?, ?, ?),
        (?, ?, ?);`;

    await db.query<OkPacket>(query, [
      `${correctAnswers[0]}`,
      answers[0],
      quizId.toString(),
      `${correctAnswers[1]}`,
      answers[1],
      quizId.toString(),
      `${correctAnswers[2]}`,
      answers[2],
      quizId.toString(),
      `${correctAnswers[3]}`,
      answers[3],
      quizId.toString(),
    ]);
  },

  async getQuizMainInfo(): Promise<QuizMainPageViewModel[]> {
    const query: string = `SELECT questions.id AS id, title, category, users.userName AS userName from questions 
    JOIN users ON questions.userId = users.id
    ORDER BY questions.id DESC;`;
    return await db.query<QuizMainPageViewModel[]>(query);
  },

  async getQuizzesByCategory(
    categoryType: string,
  ): Promise<QuizMainPageViewModel[]> {
    const query: string = `SELECT questions.id AS id, title, category, users.userName AS userName from questions 
    JOIN users ON questions.userId = users.id
    WHERE category = ?
    ORDER BY questions.id DESC;`;
    return await db.query<QuizMainPageViewModel[]>(query, [categoryType]);
  },
};
