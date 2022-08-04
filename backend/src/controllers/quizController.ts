import { NextFunction, Request, Response } from 'express';
import { quizService } from '../services/quizService';

export const quizController = {
  async addNewQuiz(req: Request, res: Response, next: NextFunction) {
    const {
      title,
      question,
      category,
      answerOne,
      correctAnswerOne,
      answerTwo,
      correctAnswerTwo,
      answerThree,
      correctAnswerThree,
      answerFour,
      correctAnswerFour,
    } = req.body;

    const answers: string[] = [answerOne, answerTwo, answerThree, answerFour];
    const correctAnswers: number[] = [
      correctAnswerOne,
      correctAnswerTwo,
      correctAnswerThree,
      correctAnswerFour,
    ];

    try {
      await quizService.addNewQuiz(
        title,
        question,
        category,
        answers,
        correctAnswers,
      );
      res.status(200).send();
    } catch (err) {
      next(err);
    }
  },

  async getMainInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const quizMainInfo = await quizService.getQuizMainInfo();
      res.status(200).send(quizMainInfo);
    } catch (err) {
      next(err);
    }
  },

  async getQuizzesByCategory(req: Request, res: Response, next: NextFunction) {
    const { category } = req.params;

    try {
      const result = await quizService.getQuizzesByCategory(category);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  },
};
