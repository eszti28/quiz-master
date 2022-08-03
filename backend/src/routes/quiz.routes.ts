import express from 'express';
import { quizController } from '../controllers/quizController';

const quizRouter = express.Router();

quizRouter.get('/main-info', quizController.getMainInfo);

quizRouter.put('/new-quiz', quizController.addNewQuiz);

quizRouter.get('/:category', quizController.getQuizzesByCategory);

export default quizRouter;
