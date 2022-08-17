import { NextFunction, Request, Response } from 'express';
import { UserLoginRequestViewModel } from '../models/common/UserLoginRequestViewModel';
import { UserRegistrationRequestModel } from '../models/request/UserRegistrationRequestModel';
import { UserLoginViewModel } from '../models/view/UserLoginViewModel';
import { UserRegistrationViewModel } from '../models/view/UserRegistrationViewModel';
import { badRequestError } from '../services/generalErrorService';
import { jwtService } from '../services/jwtService';
import { userService } from '../services/userService';

export const userController = {
  async register(
    req: Request<UserRegistrationRequestModel>,
    res: Response<UserRegistrationViewModel>,
    next: NextFunction,
  ) {
    const { username, password, email } = req.body;

    if (!username && !password && !email) {
      next(badRequestError('Username, password and email are required.'));
      return;
    }

    if (!password) {
      next(badRequestError('Password is required.'));
      return;
    }

    if (!username) {
      next(badRequestError('Username is required.'));
      return;
    }

    if (!email) {
      next(badRequestError('Email is required.'));
      return;
    }

    if (password.length < 8) {
      next(badRequestError('Password must be 8 characters.'));
      return;
    }

    const registrationData: UserRegistrationRequestModel = {
      username,
      password,
      email,
    };

    try {
      const userWithToken = await userService.register(registrationData);
      res.status(201).send(userWithToken);
    } catch (err) {
      next(err);
    }
  },

  async login(
    request: Request<UserLoginRequestViewModel>,
    response: Response<UserLoginViewModel>,
    next: NextFunction,
  ) {
    const { username, password } = request.body;

    if (!username && !password) {
      next(badRequestError('All fields are required'));
      return;
    }

    if (!password) {
      next(badRequestError('Password is required'));
      return;
    }

    if (!username) {
      next(badRequestError('Username is required'));
      return;
    }

    const loginData: UserLoginRequestViewModel = {
      username: username,
      password: password,
    };

    try {
      const user = await userService.login(loginData);
      response.status(200).send(user);
    } catch (error) {
      next(error);
    }
  },

  async getQuizzesByUserId(req: Request, res: Response, next: NextFunction) {
    const token = jwtService.getTokenFromRequest(req);
    const { userId } = jwtService.getTokenPayload(token);

    try {
      const quizzesById = await userService.getQuizzesByUserId(userId);
      res.status(200).send(quizzesById);
    } catch (err) {
      next(err);
    }
  },

  async updateUserPoints(req: Request, res: Response, next: NextFunction) {
    const { points } = req.body;
    const token = jwtService.getTokenFromRequest(req);
    const { userId } = jwtService.getTokenPayload(token);

    try {
      await userService.updateUserPoints(points, userId);
      res.status(200).send();
    } catch (err) {
      next(err);
    }
  },

  async deleteUserQuiz(req: Request, res: Response, next: NextFunction) {
    const { quizId } = req.params;
    const token = jwtService.getTokenFromRequest(req);
    const { userId } = jwtService.getTokenPayload(token);

    try {
      await userService.deleteUserQuiz(quizId, userId);
      res.status(200).send();
    } catch (err) {
      next(err);
    }
  },
};
