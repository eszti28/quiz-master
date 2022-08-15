import { OkPacket } from 'mysql';
import { db } from '../data/connections';
import { GetNewQuestionDomainModel } from '../models/domain/GetNewQuestionDomainModel';

export const addQuizRepository = {
  async addNewTitle(
    title: string,
    category: string,
    userId: number,
  ): Promise<void> {
    const query: string = `INSERT INTO titles (title, category, userId) VALUES (?, ?, ?);`;

    await db.query<OkPacket>(query, [title, category, userId.toString()]);
  },

  async addAndGetNewQuestion(
    question: string,
    titleId: number,
  ): Promise<GetNewQuestionDomainModel[]> {
    const addNewQuestion: string = `INSERT INTO questions (question, titleId) VALUES (?, ?);`;

    const getNewestQuestion: string = `SELECT MAX(id) AS id FROM questions;`;

    await db.query<OkPacket>(addNewQuestion, [question, titleId.toString()]);

    return await db.query<GetNewQuestionDomainModel[]>(getNewestQuestion);
  },

  async addAnswersToQuestion(
    correctAnswers: number[],
    answers: string[],
    quizId: number,
  ): Promise<void> {
    const query: string = `INSERT INTO answers (correctAnswer, answer, quizId) VALUES 
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
    ]);
  },
};
