import express from 'express';
import { userController } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/register', userController.register);

userRouter.post('/login', userController.login);

userRouter.get('/my-quizzes', userController.getQuizzesByUserId);

userRouter.put('/points', userController.updateUserPoints);

userRouter.delete('/delete/:quizId', userController.deleteUserQuiz);

export default userRouter;
