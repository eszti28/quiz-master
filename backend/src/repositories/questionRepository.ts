import { OkPacket } from "mysql";
import { db } from "../data/connections";
import { QuestionDomainModel } from "../models/domain/QuestionDomainModel";

export const questionRepository = {
    async addNewQuestion(title: string, question: string, category: string): Promise<void> {
        const query: string = `INSERT INTO questions (title, question, category, userId) VALUES (?, ?, ?, ?);`;
    
        await db.query<QuestionDomainModel[]>(query, [
            title, question, category, `${3}`
                 ]);
      },

      async getMaxQuestionId(): Promise<number> {
        const query: string = `SELECT MAX(id) as id FROM questions;`

        const maxId = await db.query<{id: number}[]>(query);

        return maxId[0].id;
      },

    async addAnswersToQuestion(correctAnswers: number[], answers: string[], quizId: number,): Promise<void> {
        const query: string = `INSERT INTO answers (correctAnswer, answer, quizId) VALUES 
        (?, ?, ?), 
        (?, ?, ?),
        (?, ?, ?),
        (?, ?, ?);`
        
        await db.query<OkPacket>(query, [
          `${correctAnswers[0]}`, answers[0], quizId.toString(),
          `${correctAnswers[1]}`, answers[1], quizId.toString(),
          `${correctAnswers[2]}`, answers[2], quizId.toString(),
          `${correctAnswers[3]}`, answers[3], quizId.toString(),
        ]);
    }
}