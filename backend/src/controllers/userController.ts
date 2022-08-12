import { NextFunction, Request, Response } from 'express';
import { UserLoginRequestViewModel } from '../models/common/UserLoginRequestViewModel';
import { UserRegistrationRequestModel } from '../models/request/UserRegistrationRequestModel';
import { UserLoginViewModel } from '../models/view/UserLoginViewModel';
import { UserRegistrationViewModel } from '../models/view/UserRegistrationViewModel';
import { badRequestError } from '../services/generalErrorService';
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
};
