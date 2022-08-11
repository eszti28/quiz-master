import { OkPacket } from 'mysql';
import { db } from '../data/connections';
import { UserDomainModel } from '../models/domain/UserDomainModel';

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
};
