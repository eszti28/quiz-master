import express from 'express';
import { userController } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/register', userController.register);

userRouter.post('/login', userController.login);

userRouter.get('/my-quizzes', userController.getQuizzesByUserId);

userRouter.get('/points', userController.getUserPoints);

userRouter.put('/points', userController.updateUserPoints);

export default userRouter;
