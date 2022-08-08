import { NextFunction, Request, Response } from 'express';
import { CategoryType } from '../models/enums/CategoryType';
import { badRequestError } from '../services/generalErrorService';
import { quizService } from '../services/quizService';

export const quizController = {
  async addNewTitle(req: Request, res: Response, next: NextFunction) {
    const { title, category, userId } = req.body;

    if (!(category in CategoryType)) {
      next(badRequestError('Invalid category type'));
      return;
    }

    if (!title || !category || !userId) {
      next(badRequestError('Every field is required'));
      return;
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
      question,
      answerOne,
      isCorrectOne,
      answerTwo,
      isCorrectTwo,
      answerThree,
      isCorrectThree,
    } = req.body;

    if (
      !question ||
      !answerOne ||
      !isCorrectOne ||
      !answerTwo ||
      !isCorrectTwo ||
      !answerThree ||
      isCorrectThree
    ) {
      next(badRequestError('Every field is required'));
      return;
    }

    const answers: string[] = [answerOne, answerTwo, answerThree];
    const correctAnswers: boolean[] = [
      isCorrectOne,
      isCorrectTwo,
      isCorrectThree,
    ];

    try {
      await quizService.addNewQuestion(question, answers, correctAnswers);
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

    if (!(category in CategoryType)) {
      next(badRequestError('Invalid category type'));
      return;
    }

    try {
      const result = await quizService.getQuizzesByCategory(category);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  },
};
