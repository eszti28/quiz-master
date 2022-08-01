import { NextFunction, Request, Response } from 'express';
import { quizService } from "../services/quizService";

export const quizController = {
    async addNewQuiz(req: Request, res: Response, next: NextFunction) {

        const { question, category, answer, correctAnswer } = req.body;
    
        try {
          await quizService.addNewQuiz(question, category, answer, correctAnswer);
          res.status(200).send();
        } catch (err) {
          next(err);
        }
      },
};