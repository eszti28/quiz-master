import cors from 'cors';
import express from 'express';
import quizRouter from './quiz.routes';

const apiRouter = express.Router();

apiRouter.use(cors());
apiRouter.use(express.json());
apiRouter.use('/quizzes', quizRouter);

export default apiRouter;


