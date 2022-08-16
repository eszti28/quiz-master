import express from 'express';
import { quizController } from '../controllers/quizController';

const getQuizRouter = express.Router();

getQuizRouter.get('/main-info', quizController.getMainInfo);

getQuizRouter.get('/category/:category', quizController.getQuizzesByCategory);

export default getQuizRouter;
