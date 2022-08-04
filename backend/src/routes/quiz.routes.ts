import express from 'express';
import { quizController } from '../controllers/quizController';

const quizRouter = express.Router();

quizRouter.get('/main-info', quizController.getMainInfo);

quizRouter.put('/new-title', quizController.addNewTitle);

quizRouter.put('/new-question', quizController.addNewQuestion);

quizRouter.get('/category/:category', quizController.getQuizzesByCategory);

export default quizRouter;
