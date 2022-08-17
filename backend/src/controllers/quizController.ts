import { NextFunction, Request, Response } from 'express';
import { CategoryType } from '../models/enums/CategoryType';
import {
  badRequestError,
  notFoundError,
} from '../services/generalErrorService';
import { jwtService } from '../services/jwtService';
import { quizService } from '../services/quizService';

export const quizController = {
  async addNewTitle(req: Request, res: Response, next: NextFunction) {
    const { title, category } = req.body;
    const token = jwtService.getTokenFromRequest(req);
    const { userId } = jwtService.getTokenPayload(token);

    if (!(category in CategoryType)) {
      next(badRequestError('Invalid category type'));
      return;
    }

    if (!title || !category) {
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

    if (!question || !answerOne || !answerTwo || !answerThree) {
      next(badRequestError('Every field is required'));
      return;
    }

    const answers: string[] = [answerOne, answerTwo, answerThree];
    const correctAnswers: boolean[] = [
      isCorrectOne,
      isCorrectTwo,
      isCorrectThree,
    ];

    if (!correctAnswers.includes(true)) {
      next(badRequestError('No right answer given'));
      return;
    }

    const filterCorrectAnswers = correctAnswers.filter(
      isCorrect => isCorrect === true,
    );

    if (filterCorrectAnswers.length > 1) {
      next(badRequestError('Only one answer can be right'));
      return;
    }

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

  async getQuestionsToTitle(req: Request, res: Response, next: NextFunction) {
    const { titleId } = req.params;

    if (!titleId) {
      next(notFoundError('Valid title id required'));
      return;
    }

    try {
      const titleInfo = await quizService.getQuestionsToTitle(
        parseInt(titleId),
      );
      res.status(200).send(titleInfo);
    } catch (err) {
      next(err);
    }
  },

  async isAnswerCorrect(req: Request, res: Response, next: NextFunction) {
    const { answerId } = req.params;

    if (!answerId) {
      next(notFoundError('Valid answer id required'));
      return;
    }

    try {
      const answerInfo = await quizService.isAnswerCorrect(parseInt(answerId));
      res.status(200).send(`${answerInfo}`);
    } catch (err) {
      next(err);
    }
  },
};
