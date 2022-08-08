import { NextFunction, Request, Response } from 'express';
import { CategoryType } from '../models/enums/CategoryType';
import { quizService } from '../services/quizService';

export const quizController = {
  async addNewTitle(req: Request, res: Response, next: NextFunction) {
    const { title, category, userId } = req.body;

    if (!(category in CategoryType)) {
      throw Error('Invalid category type');
    }

    if (!title || !category || !userId) {
      throw Error('Every field is required');
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
      throw Error('Every field is required');
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
