import express from 'express';
import { quizController } from '../controllers/quizController';

const makeQuizRouter = express.Router();

makeQuizRouter.post('/title', quizController.addNewTitle);

makeQuizRouter.post('/new-question', quizController.addNewQuestion);

export default makeQuizRouter;
