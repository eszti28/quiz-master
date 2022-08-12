import { Request, Response, NextFunction } from 'express';
import getTokenFromRequest from '../../src/middlewares/authenticator';
import { userRepository } from '../../src/repositories/userRepository';
import {
  forbiddenError,
  unauthorizedError,
} from '../../src/services/generalErrorService';
import { jwtService } from '../../src/services/jwtService';

describe('Authorization middleware', () => {
  it('authorization is ok and called next function', async () => {
    //Arrange
    const mockRequest: Partial<Request> = {};
    const mockResponse: Partial<Response> = {};
    const token = 'YWxhZGRpbjpvcGVuc2VzYW1l';
    const tokenData = {
      userId: 1,
      userName: 'Eszti',
    };

    const userData = {
      id: 1,
      userName: 'Eszti',
      email: 'eszti@gmail.com',
      password: '12345678',
      score: 0,
    };

    const nextFunction: NextFunction = jest.fn();
    jwtService.getTokenFromRequest = jest.fn().mockReturnValue(token);
    jwtService.verifyToken = jest.fn().mockReturnValue(true);
    jwtService.getTokenPayload = jest.fn().mockReturnValue(tokenData);
    userRepository.getUserByName = jest.fn().mockResolvedValue(userData);

    //Act
    await getTokenFromRequest(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );
    //Assert
    expect(jwtService.getTokenFromRequest).toHaveBeenCalledTimes(1);
    expect(jwtService.getTokenFromRequest).toHaveBeenCalledWith(mockRequest);
    expect(jwtService.verifyToken).toHaveBeenCalledWith(token);
    expect(jwtService.verifyToken).toHaveBeenCalledTimes(1);
    expect(jwtService.getTokenPayload).toHaveBeenCalledWith(token);
    expect(jwtService.getTokenPayload).toHaveBeenCalledTimes(1);
    expect(userRepository.getUserByName).toHaveBeenCalledWith('Eszti');
    expect(userRepository.getUserByName).toHaveBeenCalledTimes(1);
    expect(nextFunction).toHaveBeenCalledWith();
    expect(nextFunction).toHaveBeenCalledTimes(1);
  });

  it('without request headers token will be null and get 401', async () => {
    //Arrange
    const mockRequest: Partial<Request> = {};
    const mockResponse: Partial<Response> = {};
    const apiErrorModel = unauthorizedError('user logged out');
    const nextFunction: NextFunction = jest.fn();
    jwtService.getTokenFromRequest = jest.fn();
    jwtService.verifyToken = jest.fn();

    //Act
    getTokenFromRequest(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );
    //Assert
    expect(jwtService.getTokenFromRequest).toHaveBeenCalledTimes(1);
    expect(jwtService.getTokenFromRequest).toHaveBeenCalledWith(mockRequest);
    expect(jwtService.verifyToken).toHaveBeenCalledTimes(0);
    expect(nextFunction).toHaveBeenCalledTimes(1);
    expect(nextFunction).toHaveBeenCalledWith(apiErrorModel);
  });

  it('invalid token and get 403', async () => {
    //Arrange
    const mockRequest: Partial<Request> = {};
    const mockResponse: Partial<Response> = {};
    const apiErrorModel = forbiddenError('invalid token');
    const nextFunction: NextFunction = jest.fn();
    const token = 'YWxhZGRpbjpvcGVuc2VzYW1l';
    jwtService.getTokenFromRequest = jest.fn().mockReturnValue(token);
    jwtService.verifyToken = jest.fn().mockReturnValue(false);

    //Act
    getTokenFromRequest(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );
    //Assert
    expect(jwtService.getTokenFromRequest).toHaveBeenCalledTimes(1);
    expect(jwtService.getTokenFromRequest).toHaveBeenCalledWith(mockRequest);
    expect(jwtService.verifyToken).toHaveBeenCalledWith(token);
    expect(jwtService.verifyToken).toHaveBeenCalledTimes(1);
    expect(nextFunction).toHaveBeenCalledWith(apiErrorModel);
    expect(nextFunction).toHaveBeenCalledTimes(1);
  });

  it('should call next function with error when account does not belongs to authenticated user', async () => {
    //Arrange
    const mockRequest: Partial<Request> = {};
    const mockResponse: Partial<Response> = {};
    const apiErrorModel = unauthorizedError(
      'This account does not belong to authenticated player',
    );
    const token = 'YWxhZGRpbjpvcGVuc2VzYW1l';
    const tokenData = {
      userId: 1,
      userName: 'Eszti',
    };

    const userData = {
      id: 2,
      userName: 'Anett',
      email: 'Anett@gmail.com',
      password: 'djaskj',
      score: 0,
    };

    const nextFunction: NextFunction = jest.fn();
    jwtService.getTokenFromRequest = jest.fn().mockReturnValue(token);
    jwtService.verifyToken = jest.fn().mockReturnValue(true);
    jwtService.getTokenPayload = jest.fn().mockReturnValue(tokenData);
    userRepository.getUserByName = jest.fn().mockResolvedValue(userData);

    //Act
    await getTokenFromRequest(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );
    //Assert
    expect(jwtService.getTokenFromRequest).toHaveBeenCalledTimes(1);
    expect(jwtService.getTokenFromRequest).toHaveBeenCalledWith(mockRequest);
    expect(jwtService.verifyToken).toHaveBeenCalledWith(token);
    expect(jwtService.verifyToken).toHaveBeenCalledTimes(1);
    expect(jwtService.getTokenPayload).toHaveBeenCalledWith(token);
    expect(jwtService.getTokenPayload).toHaveBeenCalledTimes(1);
    expect(nextFunction).toHaveBeenCalledWith(apiErrorModel);
    expect(nextFunction).toHaveBeenCalledTimes(1);
  });
});
