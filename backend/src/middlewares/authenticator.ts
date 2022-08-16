import { Request, Response, NextFunction } from 'express';
import { userRepository } from '../repositories/userRepository';
import {
  forbiddenError,
  unauthorizedError,
} from '../services/generalErrorService';
import { jwtService } from '../services/jwtService';

export default async function getTokenFromRequest(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = jwtService.getTokenFromRequest(req);

  if (!token) {
    next(unauthorizedError('user logged out'));
    return;
  }

  if (!jwtService.verifyToken(token as string)) {
    next(unauthorizedError('invalid token'));
    return;
  }

  const { userId, userName } = jwtService.getTokenPayload(token);

  try {
    const userData = await userRepository.getUserByName(userName);
    if (userData.id !== userId) {
      next(
        forbiddenError('This account does not belong to authenticated player'),
      );
      return;
    }
  } catch (err) {
    next(err);
    return;
  }
  next();
}
