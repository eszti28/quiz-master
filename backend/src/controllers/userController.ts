import { NextFunction, Request, Response } from 'express';
import { UserRegistrationRequestViewModel } from '../models/view/UserRegistrationRequestViewModel';
import { badRequestError } from '../services/generalErrorService';
import { userService } from '../services/userService';

export const userController = {
  async register(
    req: Request<UserRegistrationRequestViewModel>,
    res: Response<UserRegistrationRequestViewModel>,
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

    const registrationData: UserRegistrationRequestViewModel = {
      username,
      password,
      email,
    };

    try {
      await userService.register(registrationData);
      res.status(201).send(registrationData);
    } catch (err) {
      next(err);
    }
  },
};
