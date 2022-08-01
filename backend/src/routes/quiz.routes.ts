import express from "express";
import { quizController } from "../controllers/quizController";

const quizRouter = express.Router();

quizRouter.put('/new-quiz', quizController.addNewQuiz)

export default quizRouter;
