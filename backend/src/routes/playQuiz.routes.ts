import express from 'express';
import { quizController } from '../controllers/quizController';

const playQuizRouter = express.Router();

playQuizRouter.get('/:titleId', quizController.getQuestionsToTitle);

export default playQuizRouter;
