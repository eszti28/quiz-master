import cors from 'cors';
import express from 'express';
import getQuizRouter from './getQuiz.routes';
import makeQuizRouter from './makeQuiz.routes';
import playQuizRouter from './playQuiz.routes';

const apiRouter = express.Router();

apiRouter.use(cors());
apiRouter.use(express.json());
apiRouter.use('/quizzes', getQuizRouter);
apiRouter.use('/make-quiz', makeQuizRouter);
apiRouter.use('/play-quiz', playQuizRouter);

export default apiRouter;
