import { OkPacket } from "mysql";
import { db } from "../data/connections";
import { QuestionDomainModel } from "../models/domain/QuestionDomainModel";

export const questionRepository = {
    async addNewQuestion(question: string, category: string): Promise<void> {
        const query: string = `INSERT INTO questions (question, category, userId) VALUES (?, ?, ?);`;
    
        await db.query<QuestionDomainModel[]>(query, [
            question, category, `${1}`       ]);
      },

      async getMaxQuestionId(): Promise<number> {
        const query: string = `SELECT MAX(id) as id FROM questions;`

        const maxId = await db.query<{id: number}[]>(query);

        return maxId[0].id;
      },

    async addAnswersToQuestion(correctAnswer: number, answer: string, quizId: number,): Promise<void> {
        const query: string = `INSERT INTO answers (correctAnswer, answer, quizId) VALUES (?, ?, ?);`
        
        await db.query<OkPacket>(query, [`${correctAnswer}`, answer, quizId.toString()]);
    }
}