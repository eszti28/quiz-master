import cors from 'cors';
import express from 'express';
import getTokenFromRequest from '../middlewares/authenticator';
import getQuizRouter from './getQuiz.routes';
import makeQuizRouter from './makeQuiz.routes';
import playQuizRouter from './playQuiz.routes';
import userRouter from './user.routes';

const apiRouter = express.Router();

apiRouter.use(cors());
apiRouter.use(express.json());
apiRouter.use(getTokenFromRequest);
apiRouter.use('/quizzes', getQuizRouter);
apiRouter.use('/make-quiz', makeQuizRouter);
apiRouter.use('/play-quiz', playQuizRouter);
apiRouter.use('/user', userRouter);

export default apiRouter;
