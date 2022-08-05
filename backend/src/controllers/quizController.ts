import { NextFunction, Request, Response } from 'express';
import { quizService } from '../services/quizService';

export const quizController = {
  async addNewTitle(req: Request, res: Response, next: NextFunction) {
    const { title, category, userId } = req.body;

    if (!title || !category) {
      throw new Error('Every field is required');
    }

    //token
    if (!userId) {
      throw new Error('Invalid');
    }

    try {
      await quizService.addNewTitle(title, category, userId);
      res.status(200).send();
    } catch (err) {
      next(err);
    }
  },

  async addNewQuestion(req: Request, res: Response, next: NextFunction) {
    const {
      titleId,
      question,
      answerOne,
      correctAnswerOne,
      answerTwo,
      correctAnswerTwo,
      answerThree,
      correctAnswerThree,
    } = req.body;

    //errors

    const answers: string[] = [answerOne, answerTwo, answerThree];
    const correctAnswers: number[] = [
      correctAnswerOne,
      correctAnswerTwo,
      correctAnswerThree,
    ];

    try {
      await quizService.addNewQuestion(
        titleId,
        question,
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

    if (!category) {
      throw new Error("You don't have a category selected");
    }

    try {
      const result = await quizService.getQuizzesByCategory(category);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  },
};
