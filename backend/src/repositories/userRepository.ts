import { OkPacket } from 'mysql';
import { db } from '../data/connections';
import { QuizIdToUserDomainModel } from '../models/domain/QuizIdToUserDomainModel';
import { QuizMainPageDomainModel } from '../models/domain/QuizMainPageDomainModel';
import { UserDomainModel } from '../models/domain/UserDomainModel';
import { UserPointsDomainModel } from '../models/domain/UserPointsDomainModel';

export const userRepository = {
  async getUserByName(username: string): Promise<UserDomainModel> {
    const query: string = `SELECT * FROM users WHERE userName = ?`;

    const userList = await db.query<UserDomainModel[]>(query, [username]);
    return userList[0];
  },

  async registerUser(
    username: string,
    email: string,
    password: string,
  ): Promise<number> {
    const registrationQuery: string = `INSERT INTO users (userName, email, password) VALUES (?, ?, ?)`;

    const registrationResult = await db.query<OkPacket>(registrationQuery, [
      username,
      email,
      password,
    ]);

    return registrationResult.insertId;
  },

  async getQuizzesByUserId(userId: number): Promise<QuizMainPageDomainModel[]> {
    const query: string = `SELECT titles.id AS id, title, category, users.userName AS userName from titles 
    JOIN users ON titles.userId = users.id
    WHERE titles.userId = ?
    ORDER BY titles.id DESC;`;

    return await db.query<QuizMainPageDomainModel[]>(query, [
      userId.toString(),
    ]);
  },

  async getUserPoints(userId: number): Promise<UserPointsDomainModel> {
    const query: string = `SELECT points FROM users WHERE id = ?;`;

    const userPoints = await db.query<UserPointsDomainModel[]>(query, [
      userId.toString(),
    ]);

    return userPoints[0];
  },

  async updateUserPoints(points: number, userId: number): Promise<void> {
    const query: string = `UPDATE users SET points = points + ? WHERE id = ?;`;

    await db.query<OkPacket>(query, [points.toString(), userId.toString()]);
  },

  async deleteUserQuiz(quizId: string): Promise<void> {
    const query: string = `DELETE FROM titles WHERE id = ?;`;

    await db.query<OkPacket>(query, [quizId]);
  },

  async getUserToQuiz(quizId: string): Promise<number> {
    const query: string = `SELECT userId FROM titles WHERE id = ?;`;

    const userId = await db.query<QuizIdToUserDomainModel[]>(query, [quizId]);

    return userId[0].userId;
  },
};
