import express from "express";
import { quizController } from "../controllers/quizController";

const quizRouter = express.Router();

quizRouter.get('/newest-quiz', quizController.getNewestQuiz);

quizRouter.get('/main-info', quizController.getMainInfo);

quizRouter.put('/new-quiz', quizController.addNewQuiz);

export default quizRouter;
